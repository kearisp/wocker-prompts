import Table from "cli-table3";


export class CliTable<T extends object = Record<string, string>> {
    protected readonly columns: CliTable.Column<T>[];
    protected readonly options: CliTable.TableOptions;
    protected readonly rows: T[] = [];
    protected visible: CliTable.Column<T>[] | undefined;

    public constructor(options: CliTable.Options<T>) {
        const {
            headers,
            ...tableOptions
        } = options;

        this.columns = [...headers];
        this.options = tableOptions;
    }

    public get length(): number {
        return this.rows.length;
    }

    public push(...rows: T[]): this {
        this.rows.push(...rows);

        return this;
    }

    public show(names?: CliTable.ColumnName<T>[]): this {
        this.visible = names?.map((name) => {
            const column = this.columns.find((column) => column.name === name);

            if(!column) {
                throw new Error(`Column "${name}" not found`);
            }

            return column;
        });

        return this;
    }

    public toString(): string {
        const columns = this.visible || this.columns;

        const table = new Table({
            ...this.options,
            head: columns.map((column) => column.label)
        });

        for(const row of this.rows) {
            table.push(columns.map((column) => {
                const value = row[column.name];

                if(column.format) {
                    return (column.format as CliTable.Format<T>)(value, row);
                }

                return value === undefined || value === null ? "" : String(value);
            }));
        }

        return table.toString();
    }
}

export namespace CliTable {
    export type ColumnName<T> = keyof T & string;

    export type Format<T, K extends ColumnName<T> = ColumnName<T>> = (value: T[K], row: T) => string;

    export type Column<T> = {
        [K in ColumnName<T>]: {
            label: string;
            name: K;
            format?: Format<T, K>;
        };
    }[ColumnName<T>];

    export type TableOptions = Omit<Table.TableConstructorOptions, "head">;

    export type Options<T> = TableOptions & {
        headers: Column<T>[];
    };
}
