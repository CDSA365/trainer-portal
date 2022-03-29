export const convertToSlug = (string) => {
    return string
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
}
