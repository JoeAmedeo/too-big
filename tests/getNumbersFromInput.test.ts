import { getNumberFromInput } from "../src/getNumberFromInput";

describe("getNumberFromInput tests", () => {
    
    it("should convert an unsigned integrer into a string", () => {
        const result = getNumberFromInput("10");
        expect(result).toBe(10);
    });

    it("should throw if 0 if falsy input is provided", () => {
        const result = getNumberFromInput("");
        expect(result).toBe(0);
    });

    it("should throw value is not a number", () => {
        expect(() => getNumberFromInput("ten")).toThrow("Invalid input, all fields must be unsigned integer values");
    });

    it("should throw value is a negative number", () => {
        expect(() => getNumberFromInput("-3")).toThrow("Invalid input, all fields must be unsigned integer values");
    });
})