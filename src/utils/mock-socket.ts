// 每隔 100 ms 发送一个消息
let intervalId: any
const INTERVAL_MS = 100

export type OnMessage = (msg: string) => void

export function start(onMessage: OnMessage) {
  stop()

  intervalId = setInterval(() => onMessage(String(Math.random()).slice(2)), INTERVAL_MS)
}

export function stop() {
  if (intervalId) clearInterval(intervalId)
  intervalId = null
}
