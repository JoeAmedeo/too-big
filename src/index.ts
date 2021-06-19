import { getInput, setFailed, error } from "@actions/core";
import { exec } from "@actions/exec";
import { context } from "@actions/github";

const run = async (): Promise<void> => {
    const addLimit = getInput("addLimit", { required: true });
    const removeLimit = getInput("removeLimit", { required: true });
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
    await exec(`git diff --shortstat origin/main ${sha} | awk '{print $4, $6}'`);
    if(errorOutput) {
        setFailed(`Error while determining lines changed --- ${errorOutput}`);
        return;
    }
    if(!output) {
        setFailed(`Unable to get git diff`);
        return;
    }
    const diffs = output.split(" ");
    const added = diffs[0];
    const removed = diffs[1];
}