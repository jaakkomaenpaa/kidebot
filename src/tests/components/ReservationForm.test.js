import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ReservationForm from '../../components/ReservationForm/index'

describe('Reservation form', () => {
  
  beforeEach(() => {
    render(
      <ReservationForm />
    ).container
  })

  test('access code works', async () => {
    const user = userEvent.setup()
    const codeInput = screen.getByPlaceholderText('Access code')
    const accessButton = screen.getByText('Access')

    //To be changed to process.env or some other execution
    await user.type(codeInput, 'pieksämäki')
    await user.click(accessButton)

    const eventInput = screen.getByPlaceholderText('Event url')
    const tokenInput = screen.getByPlaceholderText('Bearer token')
    expect(eventInput && tokenInput).toBeDefined()
  })

})