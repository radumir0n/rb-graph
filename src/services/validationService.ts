export const hasValidCharacters = (input: string): boolean => {
    const matcher = new RegExp('^[a-zA-Z0-9, /\n/-]*$')

    return matcher.test(input)
}

export const hasRepeatedCommasAndDashes = (input: string): boolean => {
    const matcher = /([-,])\1{1,}/;

    return matcher.test(input);;
}