export const trimWhitespaces = (input: string) => {
    return input.replace(/ +?/g, '');
}

export const timesInArray = (needle: string, val: string): number => {
    let sum = 0
    for (let i = 0, len = val.length; i < len; i++) {
        if(needle === val[i]) {
            sum++
        }
    }

    return sum
}