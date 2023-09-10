import { Formik, Form, Field, ErrorMessage } from 'formik'

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
  },
  error: {
    color: 'red',
  },
  button: {
    //To be implemented
  },
}

// A basic form template with formik
const FormikForm = ({
  initialValues,
  onSubmit,
  validationSchema,
  fieldInfo,
  buttonInfo,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form style={styles.formContainer}>
          {fieldInfo.map((field) => (
            <div key={field.name} style={styles.inputContainer}>
              <Field
                style={{ ...styles.inputField, ...field.style }}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
              />
              <ErrorMessage
                style={styles.error}
                name={field.name}
                component='div'
              />
            </div>
          ))}
          <button
            type='submit'
            disabled={isSubmitting}
            style={
              buttonInfo ? buttonInfo.style : styles.button
            }
          >
            {buttonInfo ? buttonInfo.name : 'Submit'}
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default FormikForm
