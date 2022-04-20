import * as React from 'react';

// material
import TextField from '@mui/material/TextField';

// libs
import { fieldToTextField, TextFieldProps } from 'formik-mui';


function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -_.]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

function SlugField(props) {
  const {
    form: { setFieldValue },
    field: { name },
  } = props;

  const onChange = React.useCallback(
    (event) => {
      const { value } = event.target;
      setFieldValue(name, value ? string_to_slug(value) : '');
    },
    [setFieldValue, name]
  );

  return (
    <TextField {...fieldToTextField(props)} onChange={onChange} />
  );
}


export default SlugField
