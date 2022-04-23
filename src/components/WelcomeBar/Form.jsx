// env
import { env } from 'config/'

// material
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

// components
import { Formik, Fields } from 'metalib/components/Formik/'

// config
import { Request } from 'metalib/common/libs/'



function Form(props) {

  const onValidate = async (values) => {
    // ...
  }

  // const onRead = async () => {
  // }

  const onSubmit = async (values) => {
    const body = {
      ...values,
    }

    const url = env.API_URL + '/api/customers/metaeditor_request/form/'
    return await Request.POST(url, body)
  }

  const onSuccess = () => {
    props.onSuccess()
  }

  const renderFields = ({ errors, submitForm, isSubmitting, values, ...payload }) => {

    return (
      <>

        <Fields.FieldText
          label="Name"
          name="name"
          type="text"
          required
          autoComplete={false}
          errors={errors}
          InputProps={{
          }}
        />

        <Fields.FieldText
          label="Email"
          name="email"
          type="email"
          required
          autoComplete={false}
          errors={errors}
          InputProps={{
          }}
        />

        <Button
          sx={{ mt: 2 }}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={isSubmitting}
          onClick={submitForm}
        >
          Send!
        </Button>

      </>
    )
  }

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
      }}
      onSuccess={onSuccess}
      onRead={undefined}
      onSubmit={onSubmit}
      onValidate={onValidate}
      children={renderFields} />
  )
}

export default Form