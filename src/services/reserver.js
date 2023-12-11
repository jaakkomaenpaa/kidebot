import kideService from './kide'
import { sleep } from '../utils'

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
    sendStatusMessage('Waiting until the sal e starts')
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

  sendStatusMessage('Reserving tickets...')

  if (reserveTickets(data, userPreferences, authToken)) {
    sendStatusMessage('Done! Check your Kide.app wallet.')
  } else {
    sendStatusMessage('Something went wrong :(')
  }
}

// Function to add the maximum quantity of a ticket variant to the reservation
const getVariant = async (
  variant,
  maxTotalReservations,
  reservedAmount,
  authToken
) => {
  console.log('Variant', {
    name: variant.name,
  })
  const variantQuantity = Math.min(
    variant.productVariantMaximumReservableQuantity,
    variant.availability,
    maxTotalReservations - reservedAmount,
    10
  )

  reservedAmount += variantQuantity

  const response = await kideService.makeReservation(
    authToken,
    variant,
    variantQuantity
  )

  // console.log('response', response)
  return response.status === 200
}

const reserveTickets = async (data, userPreferences, authToken) => {
  const maxTotalReservations = data.maxTotalReservations || 200
  const variants = data.variants
  let reservedAmount = 0
  const variantsUsed = [] // Keeping track so that the same variants won't be reserved twice
  const { ticketIndex, keyword } = userPreferences
  let statusList = []

  if (keyword.length >= 3) {
    variants.forEach((variant) => {
      if (
        variant.name.toLowerCase().includes(keyword.toLowerCase()) &&
        variant.availability > 0 &&
        reservedAmount < maxTotalReservations
      ) {
        getVariant(variant, maxTotalReservations, reservedAmount, authToken)
          ? statusList.push(true)
          : statusList.push(false)

        variantsUsed.push(variant.id)
      }
    })
  }

  if (ticketIndex >= 1 && variants.length >= ticketIndex) {
    const wantedVariant = variants[ticketIndex - 1]
    if (
      wantedVariant.availability > 0 &&
      reservedAmount < maxTotalReservations &&
      !variantsUsed.includes(wantedVariant.id)
    ) {
      getVariant(wantedVariant, maxTotalReservations, reservedAmount, authToken)
        ? statusList.push(true)
        : statusList.push(false)

      variantsUsed.push(wantedVariant.id)
    }
  }
  // Reserving as many other variants as possible
  variants.forEach((variant) => {
    if (
      !variantsUsed.includes(variant.id) &&
      variant.availability > 0 &&
      reservedAmount < maxTotalReservations
    ) {
      getVariant(variant, maxTotalReservations, reservedAmount, authToken)
        ? statusList.push(true)
        : statusList.push(false)
    }
  })

  // console.log('list', statusList)
  return statusList.includes(true)
}

export default startProcess
