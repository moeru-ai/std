const timerMap = new Map<number, ReturnType<typeof setTimeout>>()

export const setClockInterval = (func: (...args: any[]) => any, interval: number) => {
  let start: number
  let tick: number
  let clockTimer: ReturnType<typeof setTimeout>

  const timerId = Math.floor(Math.random() * 1e10)
  // Normalize once so invalid/negative intervals don't leak into scheduling math.
  const safeInterval = Number.isFinite(interval) ? Math.max(0, interval) : 0

  const recurFunc = () => {
    func()
    const realExecuteTime = Date.now()
    if (start == null) {
      start = realExecuteTime
    }

    tick = tick ?? start
    // Drift correction: keep long-term cadence close to target interval.
    const diff = realExecuteTime - tick
    tick += safeInterval

    // Since setTimeout is not accurate, we need to adjust the interval
    // Clamp negative delay to avoid Node/Electron TimeoutNegativeWarning.
    const nextDelay = Math.max(0, safeInterval - diff)

    clockTimer = setTimeout(recurFunc, nextDelay)
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

  clearTimeout(timer)
  timerMap.delete(timerId)
}
