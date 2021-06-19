import { getInput} from "@actions/core";
import { exec } from "@actions/exec";
import { context } from "@actions/github";



const run = async (): Promise<void> => {
    const lineLimit = getInput("lineLimit", { required: true });
    
}