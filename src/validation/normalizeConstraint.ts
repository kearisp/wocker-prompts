import {ValidationConstraint} from "../types/ValidationConstraint";
import {ValidationValue} from "../types/ValidationValue";


export const normalizeConstraint = <T extends ValidationValue = ValidationValue>(
    constraint?: ValidationConstraint<T>
): [T | undefined, string | undefined] => {
    if(typeof constraint === "undefined") {
        return [undefined, undefined];
    }

    if(typeof constraint === "object" && constraint !== null && !(constraint instanceof RegExp)) {
        return [constraint.value, constraint.message];
    }

    return [
        constraint as Exclude<T, ValidationConstraint<T>>,
        undefined
    ];
};
