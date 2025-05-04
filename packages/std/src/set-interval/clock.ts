const timerMap = new Map<number, ReturnType<typeof setTimeout>>()

export const setClockInterval = (func: (...args: any[]) => any, interval: number) => {
  let start: number
  let tick: number
  let clockTimer: ReturnType<typeof setTimeout>

  // eslint-disable-next-line sonarjs/pseudo-random
  const timerId = Math.floor(Math.random() * 1e10)

  const recurFunc = () => {
    func()
    const realExecuteTime = new Date().getTime()
    if (!start) {
      start = realExecuteTime
    }

    tick = tick || start
    const diff = realExecuteTime - tick
    tick += interval

    // Since setTimeout is not accurate, we need to adjust the interval
    // eslint-disable-next-line @masknet/no-timer
    clockTimer = setTimeout(recurFunc, interval - diff)
    timerMap.set(timerId, clockTimer)
  }

  recurFunc()
  return timerId
}

export const clearClockInterval = (timerId: number) => {
  const timer = timerMap.get(timerId)
  if (timer == null) {
    return
  }

  // eslint-disable-next-line @masknet/no-timer
  clearTimeout(timer)
  timerMap.delete(timerId)
}
