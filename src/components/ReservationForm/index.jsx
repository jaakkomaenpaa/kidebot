import * as yup from 'yup'
import { useState } from 'react'

import FormikForm from '../FormikForm'
import startProcess from '../../services/reserver'
import InfoBox from './InfoBox'
import Timer from './Timer'

const validationSchema = yup.object().shape({
  eventUrl: yup.string().required('Event url is required'),
  authToken: yup.string().required('Bearer token is required'),
})

const ReservationForm = () => {
  // Temporary storing method of the access code
  const pass = 'pieksämäki'

  const [allowedIn, setAllowedIn] = useState(true)
  const [guess, setGuess] = useState('')

  const [saleStartTime, setSaleStartTime] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')

  const submit = async ({ eventUrl, authToken }) => {
    startProcess(eventUrl, authToken, setStatusMessage, setSaleStartTime)
  }

  const fieldInfo = [
    {
      name: 'eventUrl',
      placeholder: 'Event url',
      type: 'text',
      style: {
        width: 400,
        padding: 2
      }
    },
    {
      name: 'authToken',
      placeholder: 'Bearer token',
      type: 'text',
      style: {
        width: 400,
        padding: 2
      }
    }
  ]

  return allowedIn ? (
    <div>
      <FormikForm 
        initialValues={{
          eventUrl: '',
          authToken: '',
        }}
        validationSchema={validationSchema}
        onSubmit={submit}
        fieldInfo={fieldInfo}
      />
      <InfoBox statusMessage={statusMessage} />
      {saleStartTime !== null ? <Timer saleStartTime={saleStartTime}/> : null}
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
