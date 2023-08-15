
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  //const milliseconds = ms % 1000 | ${milliseconds}ms

  return `${hours}h ${minutes}m ${seconds}s`
}
