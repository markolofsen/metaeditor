import React, { forwardRef } from 'react'

// styles
import { styled } from 'metaeditor/common/styles/'

// material
import MenuItem from '@mui/material/MenuItem';
import MuiSelect from '@mui/material/Select';


const Select = styled.custom(MuiSelect, theme => ({
  marginRight: theme.spacing(1),
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    minWidth: 35,
  },
}))

const FlagImg = styled.custom('img', theme => ({
  width: 25,
  lineHeight: 0,
  display: 'inline-block',
  marginRight: theme.spacing(1),
}))

const SelectCountry = (props, ref) => {

  const handleChange = (event) => {
    props.onChange(event.target.value)
  };

  const getFlag = (flag) => {
    const src = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${flag}.svg`
    return (
      <FlagImg src={src} />
    )
  }

  return (
    <div>
      <Select
        value={props.value}
        renderValue={getFlag}
        onChange={handleChange}

        MenuProps={{
          // PopoverClasses: {
          //   anchorOrigin: {
          //     vertical: 'top',
          //     horizontal: 'left',
          //   },
          //   transformOrigin: {
          //     vertical: 'top',
          //     horizontal: 'left',
          //   }
          // }
        }}

      >
        {props.options.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {getFlag(item.value)}
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default forwardRef(SelectCountry)
