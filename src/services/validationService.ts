export const hasValidCharacters = (input: string) => {
    const matcher = new RegExp('^[a-zA-Z0-9, /\n/-]*$')

    return matcher.test(input)
}

export const hasWhiteSpace = (input: string) => {
    const matcher = new RegExp('/\s/g')

    return matcher
}