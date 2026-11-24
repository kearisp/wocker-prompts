import {ValidationResult} from "./ValidationResult";


export type ValidationRule<T> = (value: T) => ValidationResult | Promise<ValidationResult>;
