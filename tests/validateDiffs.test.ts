import { validateDiffs } from "../src/validateDiffs";

describe("validateDiffs tests", () => {
    it("should do nothing if an array of two string representations of integers is passed in", () => {
        expect(() => validateDiffs(["25", "10"])).not.toThrow();
    });

    it("should throw if the size of the array is not 2", () => {
        expect(() => validateDiffs(["25", "10", "50"])).toThrow();
    });

    it("should throw if any values are not a number", () => {
        expect(() => validateDiffs(["25", "ten"])).not.toThrow();
    });
})