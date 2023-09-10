import * as yup from 'yup'
import { useState } from 'react'

import FormikForm from '../FormikForm'
import startProcess from '../../services/reserver'
import InfoBox from './InfoBox'
import Timer from './Timer'

const validationSchema = yup.object().shape({
  eventUrl: yup.string().required('Event url is required'),
  authToken: yup.string().required('Bearer token is required'),
  ticketIndex: yup.number().nullable(),
})

const ReservationForm = () => {
  // Temporary storing method for the access code
  const pass = 'pieksämäki'

  const [allowedIn, setAllowedIn] = useState(false)
  const [guess, setGuess] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const [saleStartTime, setSaleStartTime] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')

  const submit = async ({ eventUrl, authToken, ticketIndex }) => {
    setSubmitted(true)
    startProcess(
      eventUrl,
      authToken,
      ticketIndex,
      setStatusMessage,
      setSaleStartTime
    )
  }

  const fieldInfo = [
    {
      name: 'eventUrl',
      placeholder: 'Event url',
      type: 'text',
      style: {
        width: 400,
      },
    },
    {
      name: 'authToken',
      placeholder: 'Bearer token',
      type: 'text',
      style: {
        width: 400,
      },
    },
    {
      name: 'ticketIndex',
      placeholder: 'Ticket index (optional)',
      type: 'text',
      style: {
        width: 400,
      },
    },
  ]

  return allowedIn ? (
    <div>
      {!submitted ? (
        <FormikForm
          initialValues={{
            eventUrl: '',
            authToken: '',
          }}
          validationSchema={validationSchema}
          onSubmit={submit}
          fieldInfo={fieldInfo}
        />
      ) : (
        <div>
          <InfoBox statusMessage={statusMessage} />
          {saleStartTime !== null ? (
            <Timer saleStartTime={saleStartTime} />
          ) : null}{' '}
        </div>
      )}
    </div>
  ) : (
    <div>
      <input
        type='text'
        value={guess}
        placeholder='Access code'
        onChange={(event) => setGuess(event.target.value)}
      />
      <button
        onClick={() => (guess === pass ? setAllowedIn(true) : setGuess(''))}
      >
        Access
      </button>
    </div>
  )
}

export default ReservationForm
