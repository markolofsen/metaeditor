

// styles
import { styled } from 'metaeditor/common/styles/'

// libs
import { Field as FormikField } from 'formik';

const RootDiv = styled.div(theme => ({
  padding: theme.spacing(1.1, 0),
}))


// class ErrorClass {
//   constructor(props, form, field) {
//     this.props = props
//     this.field = field
//     this.form = form
//   }
//
//   get error() {
//
//     // Get error message
//     let helperText = this.props?.helperText
//     let error = false;
//
//     const err = this.form.errors[this.field.name]
//
//     if(err) { helperText = err[0]; error = true; }
//
//     return {
//       helperText,
//       error,
//     };
//
//   }
// }

export default function Field(props) {

  return (
    <RootDiv>
      <FormikField {...props} />
    </RootDiv>
  )
}
