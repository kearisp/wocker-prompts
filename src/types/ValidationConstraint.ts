import {ValidationValue} from "./ValidationValue";
import {ValidationValueMessage} from "./ValidationValueMessage";


export type ValidationConstraint<
    T extends ValidationValue = ValidationValue
> = T | ValidationValueMessage<T>;
