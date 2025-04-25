// eslint-disable-next-line @masknet/no-timer, @masknet/prefer-timer-id
export const sleep = async (delay: number) => new Promise(resolve => setTimeout(resolve, delay))
