import * as React from 'react';
import PropTypes from 'prop-types';

// material
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';


// libs
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

// blocks
import Field from '../Field'

const GOOGLE_MAP_API_KEY = ''


function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

function CustomField(props) {
  const refTimer = React.useRef(null)

  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {

      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);


  // clearTimeout(refTimer.current)
  // refTimer.current = setTimeout(() => {
  //   const {form, field} = payload
  //   form.setFieldValue(field.name, newValue)
  //
  //   // event.target.focus()
  // }, 500)


  return (
    <Field
      name={props.name}
      label={props.label}
      required={props.required}
      component={(payload) => (
        <Autocomplete
          {...payload}
          filterOptions={(x) => x}
          options={options}
          autoComplete
          includeInputInList
          filterSelectedOptions
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.description
          }
          value={value}
          onChange={(event, newValue) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setValue(newValue);
          }}
          onInputChange={(event, newValue) => {
            setInputValue(newValue);
          }}
          renderInput={(params) => {
            return (
              <TextField {...params}
                fullWidth
                helperText={props.helperText} />
            )
          }}
          renderOption={(props, option) => {
            const matches = option.structured_formatting.main_text_matched_substrings;
            const parts = parse(
              option.structured_formatting.main_text,
              matches.map((match) => [match.offset, match.offset + match.length]),
            );

            return (
              <li {...props}>
                <Grid container alignItems="center">
                  <Grid item>
                    <Box
                      component={<Icon>location_on</Icon>}
                      sx={{ color: 'text.secondary', mr: 2 }}
                    />
                  </Grid>
                  <Grid item xs>
                    {parts.map((part, index) => (
                      <span
                        key={index}
                        style={{
                          fontWeight: part.highlight ? 700 : 400,
                        }}
                      >
                        {part.text}
                      </span>
                    ))}

                    <Typography variant="body2" color="text.secondary">
                      {option.structured_formatting.secondary_text}
                    </Typography>
                  </Grid>
                </Grid>
              </li>
            );
          }}
        />
      )}
    />
  )

}



CustomField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.disabled,
  errors: PropTypes.any,
  helperText: PropTypes.string,
};

CustomField.defaultProps = {
  errors: undefined,
};

export default CustomField
