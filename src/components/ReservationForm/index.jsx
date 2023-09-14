import * as yup from 'yup'
import { useState } from 'react'

import FormikForm from '../FormikForm'
import startProcess from '../../services/reserver'
import InfoBox from './InfoBox'
import Timer from './Timer'

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  access: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 200
  }
}

const validationSchema = yup.object().shape({
  eventUrl: yup.string().required('Event url is required'),
  authToken: yup.string().required('Bearer token is required'),
  ticketIndex: yup.number().nullable(),
  keyword: yup.string().nullable(),
})

const ReservationForm = () => {
  // Temporary storing method for the access code
  const pass = 'pieksämäki'

  const [allowedIn, setAllowedIn] = useState(false)
  const [guess, setGuess] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const [saleStartTime, setSaleStartTime] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')

  const submit = async ({ eventUrl, authToken, ticketIndex, keyword }) => {
    setSubmitted(true)
    const userPreferences = {
      ticketIndex: ticketIndex || 0,
      keyword: keyword || '',
    }
    startProcess(
      eventUrl,
      authToken,
      userPreferences,
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
      placeholder: 'Ticket index (optional, check help tab)',
      type: 'text',
      style: {
        width: 400,
      },
    },
    {
      name: 'keyword',
      placeholder: 'Keyword (optional, check help tab)',
      type: 'text',
      style: {
        width: 400,
      },
    },
  ]

  return allowedIn ? (
    <div style={styles.form}>
      {!submitted ? (
        <div>
          <p>Reservation form</p>
          <FormikForm
            initialValues={{
              eventUrl: '',
              authToken: '',
              ticketIndex: '',
              keyword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={submit}
            fieldInfo={fieldInfo}
          />
        </div>
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
    <div style={styles.access}>
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
