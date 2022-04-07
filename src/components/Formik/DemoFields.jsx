import * as React from 'react';

// components
import Formik from './Formik'
import Fields from './Fields/';
import Block from './Block/'


// material
import Button from '@mui/material/Button';


export default function Form() {
  const refFormik = React.useRef(null)

  const onValidate = async (values) => {
    // ...
  }

  const onRead = async () => {
    // await
  }

  const onSubmit = async (values) => {
    // await
  }

  const onSuccess = () => {
    // ...
  }

  const renderFields = ({ errors, submitForm, isSubmitting, values, ...payload }) => {

    return (
      <div>

        <Block.FormGroup label="Group" isClosed>

          <Fields.FieldAddress
            label="Address"
            name="address"
            errors={errors}
          />

          <Fields.FieldCheckbox
            label="Checkbox"
            name="check"
            errors={errors}
          />

          <Fields.FieldSlider
            label="Slider"
            name="slider"
            errors={errors}
          />

          <Fields.FieldColor
            label="Color"
            name="color"
            errors={errors}
          />

          <Fields.FieldAutocomlete
            label="Category"
            name="category"
            required
            errors={errors}
            helperText="One"
            renderOption={(option) => option.label}
            options={[
              {
                label: 'Demo',
                value: 'v',
              },
            ]}
            limitOptions={50}
            InputProps={{
              startAdornment: '$',
            }}
          />

          <Fields.FieldSelect
            label="Category"
            name="category"
            required
            errors={errors}
            helperText="One"
            renderOption={(option) => option.label}
            options={[
              {
                label: 'Demo',
                value: 'v',
              },
            ]}
          />

          <Fields.FieldText
            label="Title"
            name="title"
            type="text"
            required
            errors={errors}
            helperText="Some"
            InputProps={{

            }}
          />
        </Block.FormGroup>

        <Fields.FieldText
          label="Description"
          name="description"
          type="textarea"
          required
          errors={errors}
          InputProps={{

          }}
        />

        <Block.RowGroup>
          <Fields.FieldPhone
            label="Phone"
            name="phone"
            required
            errors={errors}
            InputProps={{

            }}
          />

          <Fields.FieldDate
            label="Date"
            name="date"
            type="datetime"
            required
            errors={errors}
          />
        </Block.RowGroup>


        <Block.Actions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Submit
          </Button>
        </Block.Actions>

      </div>
    )
  }

  return (
    <Formik
      ref={refFormik}
      initialValues={{
        title: '',
        phone: '',
        description: '',
        category: '',
      }}
      onSuccess={onSuccess}
      onRead={onRead}
      onSubmit={onSubmit}
      onValidate={onValidate}
      children={renderFields} />
  )
}
