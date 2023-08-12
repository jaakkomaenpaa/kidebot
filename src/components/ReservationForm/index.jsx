import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { useState } from 'react'

import startProcess from '../../services/reserver'
import InfoBox from './InfoBox'

const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputField: {
    padding: 2,
    width: 400,
  },
  error: {
    color: 'red',
  },
}

const validationSchema = yup.object().shape({
  eventUrl: yup.string().required('Event url is required'),
  authToken: yup.string().required('Bearer token is required'),
})

const ReservationForm = () => {
  const pass = 'pieksämäki'
  const [allowedIn, setAllowedIn] = useState(false)
  const [guess, setGuess] = useState('')

  const [statusMessage, setStatusMessage] = useState('')

  const submit = async ({ eventUrl, authToken }) => {
    startProcess(eventUrl, authToken, setStatusMessage)
  }

  return allowedIn ? (
    <div>
      <Formik
        initialValues={{
          eventUrl: '',
          authToken: '',
        }}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form style={styles.formContainer}>
            <div style={styles.inputContainer}>
              <Field
                style={styles.inputField}
                type='text'
                name='eventUrl'
                placeholder='Event url'
              />
              <ErrorMessage
                name='eventUrl'
                component='div'
                style={styles.error}
              />
            </div>
            <div style={styles.inputContainer}>
              <Field
                style={styles.inputField}
                type='text'
                name='authToken'
                placeholder='Bearer token'
              />
              <ErrorMessage
                name='authToken'
                component='div'
                style={styles.error}
              />
            </div>
            <button type='submit' disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <InfoBox statusMessage={statusMessage} />
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
