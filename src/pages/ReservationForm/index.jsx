import * as yup from 'yup'
import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import './index.css'
import startProcess from '../../services/reserver'
import InfoBox from './InfoBox'
import Timer from './Timer'

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
    },
    {
      name: 'authToken',
      placeholder: 'Bearer token',
    },
    {
      name: 'ticketIndex',
      placeholder: 'Ticket index (optional, check help tab)',
    },
    {
      name: 'keyword',
      placeholder: 'Keyword (optional, check help tab)',
    },
  ]

  return allowedIn ? (
    <>
      {!submitted ? (
        <div>
          <p>Reservation form</p>
          <Formik
            initialValues={{
              eventUrl: '',
              authToken: '',
              ticketIndex: '',
              keyword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={submit}
          >
            {({ isSubmitting }) => (
              <Form className='form'>
                {fieldInfo.map((field) => (
                  <div key={field.name} className='inputContainer'>
                    <Field
                      className='inputField'
                      type='text'
                      name={field.name}
                      placeholder={field.placeholder}
                    />
                    <ErrorMessage
                      className='error'
                      name={field.name}
                      component='div'
                    />
                  </div>
                ))}
                <button
                  className='submitButton'
                  type='submit'
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div>
          <InfoBox statusMessage={statusMessage} />
          {saleStartTime !== null ? (
            <Timer saleStartTime={saleStartTime} />
          ) : null}{' '}
        </div>
      )}
    </>
  ) : (
    <>
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
    </>
  )
}

export default ReservationForm
