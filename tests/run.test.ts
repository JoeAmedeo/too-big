import { run } from "../src/run";
import { getDiffs } from "../src/getDiffs";
import { getInput, setFailed } from "@actions/core";
import { mocked } from "ts-jest/utils";

jest.mock("@actions/core", () => {
    return {
        getInput: jest.fn((variable) => {
            if (variable === "addLimit") {
                return "500";
            }
            if (variable === "removeLimit") {
                return "1000";
            }
            if (variable === "totalLimit") {
                return "5000";
            }
            return undefined;
        }),
        setFailed: jest.fn()
    }
})

jest.mock("../src/getDiffs", () => {
    return {
        getDiffs: jest.fn(() => ["107", "41"])
    }
})

const mockedGetDiffs = mocked(getDiffs);
const mockedGetInput = mocked(getInput);
const mockedSetFailed = mocked(setFailed);

describe("run tests", () => {
    it("should successfully run through the workflow", async () => {
        await run();
        expect(mockedSetFailed).not.toHaveBeenCalled();
    });

    it("should set failed if any errors are thrown", async () => {
        mockedGetDiffs.mockImplementationOnce(async () => ["1000", "20"])
        await run();
        expect(mockedSetFailed).toBeCalledTimes(1);
    })
});