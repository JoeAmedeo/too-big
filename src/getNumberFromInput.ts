export const getNumberFromInput = (input: string): number => {
    if(!input){
        return 0;
    }
    const inputAsNumber = parseInt(input);
    if(isNaN(inputAsNumber) || inputAsNumber < 0){
        throw new Error("Invalid input, all fields must be unsigned integer values");
    }
    return inputAsNumber;
}