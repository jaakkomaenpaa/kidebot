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
  return string.split('').reverse().join('')
}

export const getRequestId = (inventoryId) => {
  // eslint-disable-next-line no-undef
  const secret = process.env.REACT_APP_SECRET_STRING
  return btoa(
    [...inventoryId.replace(/-/g, '')]
      .map((char, i) =>
        String.fromCharCode(char.charCodeAt(0) ^ secret.charCodeAt(i))
      )
      .join('')
  ).substring(0, 8)
}
