import { getInput, setFailed } from "@actions/core";
import { getNumberFromInput } from "./getNumberFromInput";
import { getDiffs } from "./getDiffs";
import { validateDiffs } from "./validateDiffs";
import { checkLimit } from "./checkLimit";
import { Validator } from "./constants";


export const run = async (): Promise<void> => {
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