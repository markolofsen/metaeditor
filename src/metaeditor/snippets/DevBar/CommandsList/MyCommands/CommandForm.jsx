import * as React from 'react';
import PropTypes from 'prop-types';

// libs
import slugify from 'slugify'

// material
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// styles
import { styled } from '../../../../common/styles/'

// components
import JsonEditor from '../../../../components/JsonEditor/'
import CustomDialog from '../../../../components/Dialog/'


const FormList = styled.ul(theme => ({
  // padding: theme.spacing(3, 0),
  '& > li': {
    marginBottom: theme.spacing(2),
  }
}))

// const DataList = styled.div(theme => ({
//
// }))

const fieldsList = [
  ['group', 'text', true, 'Group name'],
  ['command', 'text', true, 'Command slug'],
  ['name', 'text', true, 'Any name'],
  ['body', 'json', false, 'Request body'],
  ['fakeBody', 'json', false, 'Fake response body'],
].map(([slug, type, required, label]) => ({ slug, type, required, label }))

let fieldsDefault = {}
fieldsList.map(i => {
  fieldsDefault[i.slug] = i.type === 'json' ? {} : ''
})


function CommandForm(props) {
  const refDialog = React.useRef(null)

  const [isNew, setIsNew] = React.useState(true)
  const [fields, setFields] = React.useState(fieldsDefault)

  const isDisabled = fields.default

  const handleOpen = () => refDialog.current.open()
  const handleClose = () => {
    setFields(fieldsDefault)
    setIsNew(true)
    refDialog.current.close()
  }

  const handleChange = (key) => (event) => {
    let value = event.target.value

    if (['group', 'command'].includes(key)) {
      value = slugify(value, {
        replacement: '_-',  // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: false,      // convert to lower case, defaults to `false`
        strict: false,     // strip special characters except replacement, defaults to `false`
        // locale: 'vi',       // language code of the locale to use
        trim: true         // trim leading and trailing replacement chars, defaults to `true`
      })
    }

    setFields(c => ({ ...c, [key]: value }))
  }

  const handleSubmit = event => {
    event.stopPropagation()
    event.preventDefault()

    if (isNew) {
      props.onAdd(fields)
    } else {
      props.onUpdate(fields)
    }

    handleClose()
  }

  /**
   * The component instance will be extended
   * with whatever you return from the callback passed
   * as the second argument
   */
  React.useImperativeHandle(props.innerRef, () => ({
    addNew: () => {
      handleOpen()
      setFields(fieldsDefault)
      setIsNew(true)
    },
    edit: (payload) => {
      handleOpen()
      setFields(payload)
      setIsNew(false)
    },
  }));

  const renderForm = () => {

    const list = fieldsList.filter(i => i.type !== 'json')

    return (
      <Box
        component="form"
        sx={{
          // '& > :not(style)≈': { m: 1, width: '25ch' },
        }}
        onSubmit={handleSubmit}
        noValidate={false}
        autoComplete="off"
      >

        <FormList>
          {list.map((item, index) => (
            <li key={index}>
              <TextField
                size="small"
                variant="outlined"
                disabled={isDisabled}
                value={fields[item.slug]}
                label={item.label}
                type={item.type}
                required={item.required}
                multiline={item.type === 'textarea'}
                fullWidth
                onChange={handleChange(item.slug)}
              />
            </li>
          ))}
          <button type="submit" style={{ display: 'none' }} />
        </FormList>

        <JsonEditor
          label="Request body"
          content={fields.body}
          height={100}
          viewOnly={fields.default}
          onChange={(body) => {
            setFields(c => ({ ...c, body }))
          }} />

        <div style={{ height: 20 }} />

        <JsonEditor
          label="Fake response body"
          content={fields.fakeBody}
          height={100}
          viewOnly={fields.default}
          onChange={(fakeBody) => {
            setFields(c => ({ ...c, fakeBody }))
          }} />


        <Box sx={{ mt: 2 }}>
          {isNew ? (
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary">
              Create command
            </Button>
          ) : (
            !isDisabled && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    if (confirm('Are your sure?')) {
                      props.onDelete(fields)
                      handleClose()
                    }
                  }}>
                  Delete
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="success">
                  Save
                </Button>
              </Box>
            )
          )}
        </Box>

      </Box>
    )
  }


  return (
    <div>

      <CustomDialog
        ref={refDialog}
        title="Command form"
        subtitle="Enter data for the test command"
        closeIcon
        showActions={false}
      >

        {/*<pre>{JSON.stringify(fields, null, 4)}</pre>*/}

        {renderForm()}
      </CustomDialog>

    </div>
  )
}

CommandForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default React.forwardRef((props, ref) => (
  <CommandForm {...props} innerRef={ref} />
))
