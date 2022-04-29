import * as React from 'react';

// context
import { useLayout, useBuilding } from '../../context/'

// material
import Box from '@mui/material/Box';

// components
import ContentSlider from 'src/components/ContentSlider'

// panels
import OverviewCard from './OverviewCard/'
import AmenitiesList from './AmenitiesList/'
import AmenitiesOverview from './AmenitiesOverview/'
import SurroundingsList from './SurroundingsList/'
// import UnitsList from './UnitsList/'
// import UnitsOverview from './UnitsOverview/'

function PanelsList() {
  const layout = useLayout();
  const building = useBuilding();

  const list = [
    {
      slug: 'overview',
      children: OverviewCard,
      container: true,
      noPadding: false,
    },
    {
      slug: 'amenities',
      children: AmenitiesList,
      container: false,
      noPadding: false,
    },
    {
      slug: 'amenities_overview',
      children: AmenitiesOverview,
      container: true,
      noPadding: false,
    },
    {
      slug: 'surroundings',
      children: SurroundingsList,
      container: false,
      noPadding: true,
    },
    // {
    //   slug: 'units',
    //   children: UnitsList,
    //   container: false,
    //   noPadding: true,
    // },
    // {
    //   slug: 'units_overview',
    //   children: UnitsOverview,
    //   container: false,
    //   noPadding: true,
    // },
  ]

  const slug = layout.state.current_menu

  if (!building.state.building_data) {
    return (<div />)
  }

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
