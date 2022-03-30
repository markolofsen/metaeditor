import * as React from 'react';
import PropTypes from 'prop-types';

// material
import { styled } from 'metaeditor/common/styles/'
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

// components
import Container from './Container'



const Accordion = styled.custom(MuiAccordion, theme => ({

  // backgroundColor: 'red',
  // border: '1px solid rgba(0, 0, 0, .125)',
  // background: 'transparent',
  padding: 0,
  // background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4051995798319328) 30%, rgba(0,0,0,0.6320903361344538) 51%, rgba(0,0,0,0.8337710084033614) 81%, rgba(0,0,0,0.9178046218487395) 100%)',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  '&$expanded': {
    margin: 'auto',
  },

  '&.Mui-expanded': {
    margin: 0,
  },

}))




function ContentSlider({ slug, ...props }) {
  const [expanded, setExpanded] = React.useState(false);
  const [resetContent, setResetContent] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  const refDelay = React.useRef(null)

  React.useEffect(() => {

    if (!mounted) {
      setMounted(true)
      setExpanded(slug)
      return;
    }
    // console.error({slug});

    const delay = expanded === false ? 0 : 300

    // const current_key = currentSlug

    setExpanded(false);

    setResetContent(slug)
    setResetContent(false)

    setExpanded(slug)


  }, [slug])

  React.useEffect(() => {
    return () => {
      clearTimeout(refDelay.current)
    }
  }, [])

  const renderContainer = (item) => {
    if (resetContent === item.slug) return;

    if (item.container) {
      return (
        <Container>
          {item.children()}
        </Container>
      )
    }

    return (
      <div>
        {item.children()}
      </div>
    );
  }


  return (
    <div>

      {props.list.map((item, index) => (
        <Accordion
          key={index}
          square
          expanded={expanded === item.slug}
          TransitionProps={{
            unmountOnExit: false,
            timeout: {
              appear: 300,
              enter: 500,
              exit: 200,
            }
          }}>
          <AccordionSummary sx={{ display: 'none' }} />
          <AccordionDetails style={{ padding: 0 }}>
            {renderContainer(item)}
          </AccordionDetails>
        </Accordion>
      ))}

    </div>
  );
}

const listObjects = {
  slug: PropTypes.any.isRequired,
  children: PropTypes.func.isRequired,
  container: PropTypes.bool.isRequired,
  noPadding: PropTypes.bool,
}

ContentSlider.propTypes = {
  list: PropTypes.arrayOf(PropTypes.exact(listObjects)).isRequired,
  slug: PropTypes.string.isRequired,
};

export default ContentSlider
