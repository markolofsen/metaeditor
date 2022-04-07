// env
import { env } from 'api/'

// material
import Button from '@mui/material/Button'

// components
import { Formik, Fields } from 'components/Formik/'

// api
import { Request } from 'metaeditor/common/libs/'



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

    const url = env.API_URL + '/api/customers/feedbacks/form/'
    return await Request.POST(url, body)
  }

  const onSuccess = () => {
    props.onSuccess()
  }

  const renderFields = ({ errors, submitForm, isSubmitting, values, ...payload }) => {

    return (
      <div>

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

        {/* <Fields.FieldText
          label="Your opinion"
          name="text"
          type="textarea"
          required={false}
          errors={errors}
          InputProps={{
          }}
        /> */}

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

      </div>
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