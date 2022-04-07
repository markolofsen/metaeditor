import * as React from 'react';
import PropTypes from 'prop-types';

// context
import ContextProvider, { useContext } from './context/';

// material
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns'; // Depending on the library you picked
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// libs
import { Formik, Form, Field } from 'formik';


// snippers
import Snackbar from './snippets/Snackbar'


function FormikWrapper(props) {
  const context = useContext()

  const refForm = React.useRef(null)
  const refSnackbar = React.useRef(null)

  const allow_prleoad = typeof props.onRead === 'function'
  const [loading, setLoading] = React.useState(allow_prleoad)

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  React.useImperativeHandle(props.innerRef, () => ({

    refresh: () => onRead(),

  }));

  React.useEffect(() => {

    if (allow_prleoad) {
      onRead()
    } else {
      context.cls.setInitialValues(props.initialValues)
    }


  }, [])

  const onRead = async () => {

    await props.onRead().then(res => {
      if (res.status === 200) {
        // console.error('@@@res.body', res.body);
        context.cls.setInitialValues(res.body)
        setLoading(false)
      }
    })
  }

  const onSubmit = async (values, { setSubmitting }) => {

    // const debug_data = JSON.stringify(values, null, 2)
    // console.error('@@@debug_data', debug_data);

    await props.onSubmit(values).then(async res => {

      if (res.status === 403) {
        context.cls.setErrors(res.body)

        refForm.current.scrollIntoView()
        refSnackbar.current?.error()

      } else if (res.status === 200) {
        context.cls.removeErrors()

        refSnackbar.current?.success()

        if (typeof props.onSuccess === 'function') {
          await new Promise(resolve => setTimeout(resolve, 1000))

          props.onSuccess(res.body)
        }
      } else {
        refSnackbar.current?.error_code(res.status)
      }
    })

    setSubmitting(false);
  }

  const renderNonFieldErrors = () => {

    const { errors } = context.state

    const errorsList = Object.entries(errors).map(([key, value]) => ({ key, value }))
    // errors.non_field_errors

    if (errorsList.length === 0) return

    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        <AlertTitle>Errors:</AlertTitle>
        <ul>
          {errorsList.map((item, index) => (
            <li key={index}>
              {item.key}: {item.value}
            </li>
          ))}
        </ul>
      </Alert>
    )
  }

  if (loading) {
    return (
      <LinearProgress color="inherit" />
    )
  }

  return (
    <div ref={refForm}>

      <Snackbar ref={refSnackbar} />
      {renderNonFieldErrors()}

      <LocalizationProvider dateAdapter={AdapterDateFns}>

        <Formik
          validate={props.onValidate}
          enableReinitialize
          initialValues={context.state.initialValues}
          onSubmit={onSubmit}
          loading
        >
          {(payload) => {

            payload.errors = context.state.errors

            Object.entries(payload.errors).map(([key, value], index) => {
              if (Array.isArray(value) && typeof value[0] !== undefined) {
                payload.errors[key] = value.join('; ')
              }
            })
            // console.warn('payload.errors', payload.errors);

            // const { submitForm, isSubmitting, values } = payload

            return (
              <>
                {/* <pre>
                  {JSON.stringify(payload.errors, null, 4)}
                </pre> */}
                <Form>
                  {props.children(payload)}
                </Form>
              </>
            )
          }}
        </Formik>
      </LocalizationProvider>
    </div>
  );
}


FormikWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onRead: PropTypes.func,
  onSuccess: PropTypes.func,
  onValidate: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
};

FormikWrapper.defaultProps = {
};

const FormikContext = (props) => (
  <ContextProvider>
    <FormikWrapper {...props} />
  </ContextProvider>
)

export default React.forwardRef((props, ref) => (
  <FormikContext {...props} innerRef={ref} />
))
