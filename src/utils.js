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

export const createReservation = (data, preferences) => {
  const reservation = []
  const maxTotalReservations = data.maxTotalReservations || 200
  const variants = data.variants
  let reservedAmount = 0
  const variantsUsed = [] // Keeping track so that the same variants won't be added twice
  const { ticketIndex, keyword } = preferences
  // Function to add the maximum quantity of a ticket variant to the reservation
  const addTickets = (variant) => {
    console.log('variant', {
      name: variant.name
    })
    const variantQuantity = Math.min(
      variant.productVariantMaximumReservableQuantity,
      variant.availability,
      maxTotalReservations - reservedAmount,
      10
    )
    reservation.push({
      inventoryId: variant.inventoryId,
      quantity: variantQuantity,
      productVariantUserForm: null,
    })
    reservedAmount += variantQuantity
  }

  if (keyword.length >= 3) {
    variants.forEach((variant) => {
      if (
        variant.name.toLowerCase().includes(keyword.toLowerCase()) &&
        variant.availability > 0 &&
        reservedAmount < maxTotalReservations
      ) {
        addTickets(variant)
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
      addTickets(wantedVariant)
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
      addTickets(variant)
    }
  })

  return reservation
}
