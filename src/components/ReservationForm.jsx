import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'

import startProcess from '../services/reserver'

const validationSchema = yup.object().shape({
  eventUrl: yup
    .string()
    .required('Event url is required'),
  authToken: yup
    .string()
    .required('Bearer token is required')
})

const ReservationForm = () => {

  const submit = async ({ eventUrl, authToken }) => {
    startProcess(eventUrl, authToken)
  }

  return (
    <Formik
      initialValues={{
        eventUrl: '',
        authToken: ''
      }}
      validationSchema={validationSchema}
      onSubmit={submit}
    > 
      {({ isSubmitting }) => (
        <Form>
          <Field 
            type='text'
            name='eventUrl'
            placeholder='Event url'
          />
          <ErrorMessage name='eventUrl' />
          <Field 
            type='text'
            name='authToken'
            placeholder='Bearer token'
          />
          <ErrorMessage name='authToken' />
          <button type='submit' disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default ReservationForm