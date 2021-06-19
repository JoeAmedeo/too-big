import { getInput} from "@actions/core";
import { exec } from "@actions/exec";
import { context } from "@actions/github";

const run = async (): Promise<void> => {
    const lineLimit = getInput("lineLimit", { required: true });
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
    await exec(`git diff --shortstat origin/main ${sha} | awk '{print $4}'`)
}