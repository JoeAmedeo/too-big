import { checkLimit } from "../src/checkLimit";
import { Validator } from "../src/constants";

describe("checkLimit tests", () => {
    it("should not validate when the limit is set to 0", () => {
        expect(() => checkLimit(0, 500, Validator.Total)).not.toThrow();
    });

    it("should succeed if the value is less than the limit", () => {
        expect(() => checkLimit(200, 150, Validator.Added)).not.toThrow();
    });

    it("should succeed if the value is equal to the limit", () => {
        expect(() => checkLimit(25, 25, Validator.Removed)).not.toThrow();
    });

    it("should throw if the value is greater than the limit", () => {
        expect(() => checkLimit(500, 1000, Validator.Total)).not.toThrow(new Error(`Failed ${Validator.Total} check, limit of ${1000}, value of ${500}`));
    })
})