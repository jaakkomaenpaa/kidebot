export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return `${hours}h ${minutes}m ${seconds}s`
}

export const reverseString = (string) => {
  return Array.from(string).reduce((a, b) => b + a)
}

export const getRequestId = (inventoryId) => {
  const hash = reverseString(')Uuv4RGDq225/eb.utuoy//:sptth(][')
  return btoa(
    [...inventoryId.replace(/-/g, '')]
      .map((char, i) =>
        String.fromCharCode(char.charCodeAt(0) ^ hash.charCodeAt(i))
      )
      .join('')
  ).substring(0, 8)
}
