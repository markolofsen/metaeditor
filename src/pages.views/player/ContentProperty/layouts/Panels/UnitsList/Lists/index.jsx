import * as React from 'react';

// context
import {
  useUnits,
} from '../../../../context/';

// material
import { makeStyles } from '@mui/styles'
import Icon from '@mui/material/Icon';

// components
import ContentSlider from 'src/components/ContentSlider'

// blocks
import ListPlans from './Plans'
import ListUnits from './Units'
import ListCommercial from './Commercial'


const useStyles = makeStyles((theme) => ({

}));


function ListComponent(props) {
  const classes = useStyles();
  const units = useUnits()

  const list = [
    {
      slug: 'plans',
      children: ListPlans,
      container: false,
    },
    {
      slug: 'units',
      children: ListUnits,
      container: false,
    },
    {
      slug: 'commercial',
      children: ListCommercial,
      container: false,
    },
  ]

  return (
    <div>

      <ContentSlider
        list={list}
        slug={units.state.current_panel}
      />

    </div>
  );
}

export default ListComponent
