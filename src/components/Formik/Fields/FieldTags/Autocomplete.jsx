import * as React from 'react';
import PropTypes from 'prop-types';

// material
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';


function FieldTags(props) {

  const refTimer = React.useRef(null)

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const handleChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const onReturnValue = (list) => {
    const {form, field} = props

    list = list.filter((item, index) => index < props.maxTags)
    form.setFieldValue(field.name, list)
  }


  const onLoadData = () => {
    setLoading(true)
    clearTimeout(refTimer.current)

    refTimer.current = setTimeout(async () => {
      await props.method(searchQuery).then(res => {
        if(res.status === 200) {

          let newOptions = res.body

          if(searchQuery) {
            newOptions = [
              { label: searchQuery, value: searchQuery },
              ...newOptions,
            ]
          }

          setOptions(newOptions);

        }
      })
      setLoading(false)
    }, 500)
  }

  React.useEffect(() => {
    return () => {
      clearTimeout(refTimer.current)
    }
  }, [])

  React.useEffect(async () => {
    if(searchQuery) {
      onLoadData()
    }
  }, [searchQuery])


  React.useEffect(() => {
    if(!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <div>

      <Autocomplete
        selectOnFocus
        multiple
        limitTags={2}
        {...props.AutocompleteProps}
        open={open}
        onOpen={() => {
          onLoadData()
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onChange={(event, value) => {
          onReturnValue(value)
        }}
        onKeyDown={(event) => {
          if(event.key === 'Enter') {
            event.preventDefault()
          }
        }}
        value={props.value}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        getOptionLabel={(option) => option.label}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.label}
            onChange={handleChange}
            helperText={props.helperText}
            error={props.error}
            InputProps={{
              ...params.InputProps,
              ...props.InputProps,
              autoComplete: 'new-password',
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </div>
  );
}


FieldTags.propTypes = {
  method: PropTypes.func.isRequired,
  AutocompleteProps: PropTypes.object,
  maxTags: PropTypes.number,

  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.any,
  helperText: PropTypes.string,
  InputProps: PropTypes.object,
};

FieldTags.defaultProps = {
  errors: undefined,
  maxTags: 10,
};


export default FieldTags
