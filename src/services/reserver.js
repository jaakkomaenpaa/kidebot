import kideService from './kide'
import { sleep, createReservation } from '../utils'

const startProcess = async (
  eventUrl,
  authToken,
  userPreferences,
  sendStatusMessage,
  setSaleStartTime
) => {
  const request = await kideService.getEvent(eventUrl)
  if (!request) {
    sendStatusMessage('Event not found :(')
    return
  }

  sendStatusMessage('Event found')

  const saleStartTime = new Date(request.saleStart)

  // Waiting until official sales start time
  if (saleStartTime > new Date()) {
    setSaleStartTime(saleStartTime)
    sendStatusMessage('Waiting until the sale starts')
    await sleep(saleStartTime - new Date())
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

  const reservation = createReservation(data, userPreferences)

  console.log('reservation', reservation)

  sendStatusMessage('Reserving tickets...')
  // Sending the reservation
  const response = await kideService.makeReservation(authToken, reservation)
  console.log('response', response)

  if (!response || response.status !== 200) {
    sendStatusMessage('Something went wrong :(')
  } else {
    sendStatusMessage('Done! Check your Kide.app shopping cart')
  }
}






export default startProcess
