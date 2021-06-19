import { Validator } from "./constants";

export const checkLimit = (limit: number, actual: number, checkType: Validator): void => {
    if(limit > 0) {
        if(actual > limit){
            throw new Error(`Failed ${checkType} check, limit of ${limit}, value of ${actual}`)
        }
    }
}