import kideService from './kide'

const startProcess = async (eventUrl, authToken, sendStatusMessage) => {
  const request = await kideService.getEvent(eventUrl)
  if (!request) {
    sendStatusMessage('Event not found')
    return
  }

  sendStatusMessage('Event found')

  const startTime = new Date(request.saleStart)

  // Waiting until official sales start time
  if (startTime > new Date()) {
    sendStatusMessage(
      `Waiting until the sales start: ${formatTime(startTime - new Date())}`
    )
    await sleep(startTime - new Date())
  }

  // Bombing requests until sales actually start
  const wait = true
  // Will store the first successful response
  let data
  while (wait) {
    const response = await kideService.getEvent(eventUrl)
    if (
      response.salesStarted &&
      response.salesOngoing &&
      !response.salesPaused &&
      response.variants.length > 0
    ) {
      data = response
      break
    }
  }

  console.log('data', data)

  // Creating the reservation, a.k.a selecting the max amount of every ticket type
  sendStatusMessage('Forming request...')
  const reservation = []
  data.variants.forEach((variant) => {
    reservation.push({
      inventoryId: variant.inventoryId,
      quantity: Math.min(
        variant.productVariantMaximumReservableQuantity,
        variant.availability,
        data.maxReservations || 10,
        10
      ),
    })
  })

  console.log('reservation', reservation)

  sendStatusMessage('Reserving tickets...')
  // Making the actual reservation
  const response = await kideService.makeReservation(authToken, reservation)
  console.log('response', response)

  if (response.status !== 200) {
    sendStatusMessage('Something went wrong :(')
  } else {
    sendStatusMessage('Done! Check your Kide.app wallet')
  }
}

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const milliseconds = ms % 1000

  return `${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`
}

export default startProcess
