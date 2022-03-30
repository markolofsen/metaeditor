import * as React from 'react';
import PropTypes from 'prop-types';

// material
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

function CustomContainer({ children, ...props }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" {...props}>
        <div>
          {children}
        </div>
      </Container>
    </React.Fragment>
  );
}

CustomContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

CustomContainer.defaultProps = {
};

export default CustomContainer
