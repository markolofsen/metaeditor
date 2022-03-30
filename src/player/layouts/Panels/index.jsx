import * as React from 'react';

// context
import { useLayout } from 'player/context/';

// material
import Box from '@mui/material/Box';

// components
import ContentSlider from 'player/components/ContentSlider'

// panels
import Description from './Description/'
import Contacts from './Contacts/'
import Configurator from './Configurator/'
import Rendering from './Rendering/'


function PanelsList() {
  const layout = useLayout();

  const list = [
    {
      slug: 'configurator',
      children: Configurator,
      container: false,
      noPadding: false,
    },
    {
      slug: 'rendering',
      children: Rendering,
      container: true,
      noPadding: false,
    },
    {
      slug: 'description',
      children: Description,
      container: true,
      noPadding: false,
    },
    {
      slug: 'contacts',
      children: Contacts,
      container: true,
      noPadding: false,
    },
  ]

  const slug = layout.state.current_menu

  return (
    <Box sx={{ pt: 3 }}>

      <ContentSlider
        list={list}
        slug={slug}
      />

    </Box>
  );
}


export default PanelsList
