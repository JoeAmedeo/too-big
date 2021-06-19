export const validateDiffs = (diffs: string[]): void => {
    if(diffs.length !== 2){
        throw new Error(`Did not get the proper amount of output strings from git diff, expected 2 but got ${diffs.length}`);
    }
    diffs.forEach((value: string) => {
        if(parseInt(value) === NaN) {
            throw new Error(`Diff value was not an integer, recieved: ${value}`);
        }
    })
}