import { validateDiffs } from "../src/validateDiffs";

describe("validateDiffs tests", () => {
    it("should do nothing if an array of two string representations of integers is passed in", () => {
        expect(() => validateDiffs(["25", "10"])).not.toThrow();
    });

    it("should throw if the size of the array is not 2", () => {
        expect(() => validateDiffs(["25", "10", "50"])).toThrow(`Did not get the proper amount of output strings from git diff, expected 2 but got ${3}`);
    });

    it("should throw if any values are not a number", () => {
        expect(() => validateDiffs(["25", "ten"])).not.toThrow(`Diff value was not an integer, recieved: ${"ten"}`);
    });
})