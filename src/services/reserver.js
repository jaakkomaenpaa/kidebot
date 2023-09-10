import kideService from './kide'
import { sleep } from '../utils'

const startProcess = async (
  eventUrl,
  authToken,
  ticketIndex,
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

  // Creating the reservation, a.k.a selecting the max amount of every ticket type
  sendStatusMessage('Forming request...')
  const reservation = []
  if (ticketIndex >= 1 && data.variants.length >= ticketIndex) {
    // Adding the wanted variant to the reservation if it's not sold out
    const wantedVariant = data.variants[ticketIndex - 1]
    if (wantedVariant.availability > 0) {
      console.log('wanted variant', wantedVariant)
      reservation.push({
        inventoryId: wantedVariant.inventoryId,
        quantity: Math.min(
          wantedVariant.productVariantMaximumReservableQuantity,
          wantedVariant.availability,
          data.maxTotalReservations || 10,
          10
        ),
      })
    }
  // If wanted ticket index is not specified
  } else {
    data.variants.forEach((variant) => {
      if (variant.availability > 0) {
        console.log('variant', variant)
        reservation.push({
          inventoryId: variant.inventoryId,
          quantity: Math.min(
            variant.productVariantMaximumReservableQuantity,
            variant.availability,
            data.maxTotalReservations || 10,
            10
          ),
        })
      }
    })
  }

  console.log('reservation', reservation)

  sendStatusMessage('Reserving tickets...')
  // Making the actual reservation
  const response = await kideService.makeReservation(authToken, reservation)
  console.log('response', response)

  if (!response || response.status !== 200) {
    sendStatusMessage('Something went wrong :(')
  } else {
    sendStatusMessage('Done! Check your Kide.app shopping cart')
  }
}

export default startProcess
