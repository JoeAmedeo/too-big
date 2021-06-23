import { context } from "@actions/github";
import { exec } from "@actions/exec";

export const getDiffs = async (): Promise<string[]> => {
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
    await exec(`git diff --numstat origin/main ${sha} | awk '{print $1, $2}'`, [], options);
    if(errorOutput) {
        throw new Error(`Error while determining lines changed --- ${errorOutput}`);
    }
    if(!output) {
        throw new Error(`Unable to get git diff`);
    }
    return output.split(" ");
}