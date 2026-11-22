import {ValidationConstraint} from "./ValidationConstraint";
import {ValidationRule} from "./ValidationRule";


export type PromptValidationConfig<V = unknown> = {
    required?: boolean | string;
    min?: ValidationConstraint<number>;
    max?: ValidationConstraint<number>;
    minLength?: ValidationConstraint<number>;
    maxLength?: ValidationConstraint<number>;
    validate?: ValidationRule<V> | Record<string, ValidationRule<V>>;
};
