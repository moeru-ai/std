// eslint-disable-next-line @masknet/prefer-timer-id
export const sleep = async (delay: number): Promise<void> => new Promise(resolve => setTimeout(resolve, delay))
