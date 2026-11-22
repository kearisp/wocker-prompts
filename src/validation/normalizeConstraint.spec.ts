import {describe, it, expect} from "@jest/globals";
import {normalizeConstraint} from "./normalizeConstraint";
import {ValidationValue} from "../types/ValidationValue";
import {ValidationValueMessage} from "../types/ValidationValueMessage";


describe("normalizeConstraint", () => {
    it.each<[ValidationValue]>([
        [undefined as unknown as ValidationValue],
        [null as unknown as ValidationValue],
        [true],
        [1],
        ["eet"]
    ])("should return value", (constraint) => {
        const [value, message] = normalizeConstraint(constraint);

        expect(value).toEqual(constraint);
        expect(message).toBeUndefined();
    });

    it.each<[ValidationValueMessage]>([
        [{message: "Test boolean", value: true}],
        [{message: "Test number", value: 1}],
        [{message: "Test string", value: "value"}]
    ])("should normalize validation value with message", (constraint) => {
        const [value, message] = normalizeConstraint(constraint);

        expect(constraint.message).toEqual(message);
        expect(constraint.value).toEqual(value);
    });
});
