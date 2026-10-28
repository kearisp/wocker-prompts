import {Stats} from "fs";


export type PromptFileSystem = {
    existsSync(path: string): boolean;
    statSync(path: string): Stats;
    readdirSync(path: string): string[];
};
