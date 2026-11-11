import {describe, it, expect} from "@jest/globals";
import {CliTable} from "./CliTable";


const plain = {
    style: {head: [], border: []}
};

describe("CliTable", () => {
    it("should render headers and rows", () => {
        const table = new CliTable<{id: number}>({
            ...plain,
            headers: [{label: "ID", name: "id"}]
        });

        table.push({id: 1});

        const output = table.show(["id"]).toString();

        expect(output).toContain("ID");
        expect(output).toContain("1");
    });

    it("should accept several rows in one push", () => {
        const table = new CliTable({
            ...plain,
            headers: [{label: "KEY", name: "key"}]
        });

        table.push({key: "A"}, {key: "B"});

        expect(table.length).toBe(2);
        expect(table.toString()).toContain("A");
        expect(table.toString()).toContain("B");
    });

    it("should show every column by default", () => {
        const table = new CliTable({
            ...plain,
            headers: [
                {label: "KEY", name: "key"},
                {label: "VALUE", name: "value"}
            ]
        });

        table.push({key: "A", value: "1"});

        const output = table.toString();

        expect(output).toContain("KEY");
        expect(output).toContain("VALUE");
    });

    it("should show only the selected columns in the given order", () => {
        const table = new CliTable({
            ...plain,
            headers: [
                {label: "KEY", name: "key"},
                {label: "VALUE", name: "value"},
                {label: "SERVICE", name: "service"}
            ]
        });

        table.push({key: "A", value: "1", service: "web"});

        const output = table.show(["value", "key"]).toString();

        expect(output).not.toContain("SERVICE");
        expect(output).not.toContain("web");
        expect(output.indexOf("VALUE")).toBeLessThan(output.indexOf("KEY"));
    });

    it("should reset the selection when show is called without names", () => {
        const table = new CliTable({
            ...plain,
            headers: [
                {label: "KEY", name: "key"},
                {label: "VALUE", name: "value"}
            ]
        });

        table.push({key: "A", value: "1"});

        expect(table.show(["key"]).toString()).not.toContain("VALUE");
        expect(table.show().toString()).toContain("VALUE");
    });

    it("should render a missing value as an empty cell", () => {
        const table = new CliTable<{key: string; value?: string}>({
            ...plain,
            headers: [
                {label: "KEY", name: "key"},
                {label: "VALUE", name: "value"}
            ]
        });

        table.push({key: "A"});

        expect(table.toString()).not.toContain("undefined");
    });

    it("should throw on an unknown column", () => {
        const table = new CliTable({
            headers: [{label: "KEY", name: "key"}]
        });

        expect(() => table.show(["missing" as never])).toThrow("Column \"missing\" not found");
    });
});
