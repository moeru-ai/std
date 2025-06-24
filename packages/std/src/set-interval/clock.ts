const timerMap = new Map<number, ReturnType<typeof setTimeout>>()

export const setClockInterval = (func: (...args: any[]) => any, interval: number) => {
  let start: number
  let tick: number
  let clockTimer: ReturnType<typeof setTimeout>

  // eslint-disable-next-line sonarjs/pseudo-random
  let timerId = Math.floor(Math.random() * 1e10)

  let recurFunc = () => {
    func()
    let realExecuteTime = new Date().getTime()
    if (!start) {
      start = realExecuteTime
    }

    tick = tick || start
    let diff = realExecuteTime - tick
    tick += interval

    // Since setTimeout is not accurate, we need to adjust the interval

    clockTimer = setTimeout(recurFunc, interval - diff)
    timerMap.set(timerId, clockTimer)
  }

  recurFunc()
  return timerId
}

export const clearClockInterval = (timerId: number) => {
  let timer = timerMap.get(timerId)
  if (timer == null) {
    return
  }

  clearTimeout(timer)
  timerMap.delete(timerId)
}
