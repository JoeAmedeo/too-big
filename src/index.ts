import { getInput, setFailed } from "@actions/core";
import { exec } from "@actions/exec";
import { context } from "@actions/github";

enum Validator {
    Added = "lines added",
    Removed = "lines removed",
    Total = "total lines changed",
}

const getNumberFromInput = (input: string): number => {
    if(!input){
        return 0;
    }
    const inputAsNumber = parseInt(input);
    if(isNaN(inputAsNumber) || inputAsNumber < 0){
        throw new Error("Invalid input, all fields must be unsigned integer values");
    }
    return inputAsNumber;
}

const validateDiffs = (diffs: string[]): void => {
    if(diffs.length !== 2){
        throw new Error(`Did not get the proper amount of output strings from git diff, expected 2 but got ${diffs.length}`);
    }
    diffs.forEach((value: string) => {
        if(parseInt(value) === NaN) {
            throw new Error(`Diff value was not an integer, recieved: ${value}`);
        }
    })
}

const checkLimit = (limit: number, actual: number, checkType: Validator): void => {
    if(limit > 0) {
        if(actual > limit){
            throw new Error(`Failed ${checkType} check, limit of ${limit}, value of ${actual}`)
        }
    }
}

const getDiffs = async (): Promise<string[]> => {
    const { sha } = context;
    let output = "";
    let errorOutput = "";
    const options = {
        listeners: {
            stdout: (data: Buffer) => {
                output += data.toString()
            },
            stderr: (data: Buffer) => {
                errorOutput += data.toString()
            }
        }
    }
    await exec(`git diff --shortstat origin/main ${sha} | awk '{print $4, $6}'`, [], options);
    if(errorOutput) {
        throw new Error(`Error while determining lines changed --- ${errorOutput}`);
    }
    if(!output) {
        throw new Error(`Unable to get git diff`);
    }
    return output.split(" ");
}

const run = async (): Promise<void> => {
    try {
        const addLimit = getNumberFromInput(getInput("addLimit", { required: false }));
        const removeLimit = getNumberFromInput(getInput("removeLimit", { required: false }));
        const totalLimit = getNumberFromInput(getInput("totalLimit", { required: false }));   
        const diffs = await getDiffs();
        validateDiffs(diffs);
        const added = parseInt(diffs[0]);
        const removed = parseInt(diffs[1]);
        checkLimit(addLimit, added, Validator.Added);
        checkLimit(removeLimit, removed, Validator.Removed);
        checkLimit(totalLimit, added + removed, Validator.Total);
    } catch(error) {
        setFailed(error);
    }
}