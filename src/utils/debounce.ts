let timeout: NodeJS.Timeout | null = null

export const debounce = async (
    input: string,
    delay: number,
    funct: Function
): Promise<void> => {
    if (timeout) clearTimeout(timeout)
    if (input !== "") timeout = setTimeout(async () => await funct(), delay)
}