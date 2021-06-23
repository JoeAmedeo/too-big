import { getDiffs } from "../src/getDiffs";
import { context } from "@actions/github";
import { exec } from "@actions/exec";
import { mocked } from "ts-jest/utils";

const mockstdout = "25 10";

jest.mock("@actions/github", () => {
    return {
        context: {
            sha: "e4fd085"
        }
    }
});

jest.mock("@actions/exec", () => {
    return {
        exec: jest.fn((command, args, options) => {
            options.listeners.stdout(Buffer.from(mockstdout, "utf8"));
            return 0;
        })
    }
})

const mockExec = mocked(exec);

describe("getDiffs tests", () => {
    it("should return an array of strings containing the values of diffs", async () => {
        const result = await getDiffs();
        expect(result).toEqual(["25", "10"])
    })

    it("should throw if we get an something is logged to stderr", async () => {
        mockExec.mockImplementationOnce(async (commandLine, args, options): Promise<number> => {
            options?.listeners?.stderr?.(Buffer.from(mockstdout, "utf8"));
            return 1;
        });
        await expect(getDiffs()).rejects.toEqual(new Error(`Error while determining lines changed --- ${mockstdout}`))
    });

    it("should throw if nothing is logged", async () => {
        mockExec.mockImplementationOnce(async (commandLine, args, options): Promise<number> => {
            options?.listeners?.stdout?.(Buffer.from("", "utf8"));
            return 0;
        });
        await expect(getDiffs()).rejects.toEqual(new Error(`Unable to get git diff`))
    })
})