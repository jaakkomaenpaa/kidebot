import axios from 'axios'

const baseUrl = 'https://api.kide.app/api/products/'
const reservationUrl = 'https://api.kide.app/api/reservations'

const getEvent = async (eventUrl) => {
  try {
    const request = await axios.get(`${baseUrl}${eventUrl}`)
    console.log(request.data)
    const product = request.data.model.product

    return {
      saleStart: product.dateSalesFrom,
      salesStarted: product.salesStarted,
      salesOngoing: product.salesOngoing,
      salesPaused: product.salesPaused,
      maxReservations: product.maxTotalReservationsPerCheckout,
      variants: request.data.model.variants,
    }
  } catch (error) {
    console.log(error)
  }
}

const makeReservation = async (authToken, reservation) => {
  const body = {
    toCreate: reservation,
    toCancel: [],
  }

  const headers = {
    authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  }

  try {
    const response = await axios.post(reservationUrl, body, { headers })
    return response
  } catch (error) {
    console.error(error)
  }
}

export default { getEvent, makeReservation }
