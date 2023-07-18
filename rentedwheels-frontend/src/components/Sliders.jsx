import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: 'Rs.00',
  },
  {
    value: 200,
    label: 'Rs.200',
  },
  {
    value: 400,
    label: 'Rs.400',
  },
  
];

function valuetext(value) {
  return `${value}°C`;
}

const Sliders = (props) => {

 
  // const[ value, setValue] = useState([200, 300])


  // const handleChange = (event, newValue) => {
  //     setValue(newValue)
  // }

 
  return(
<Box sx={{ width: 200 }}>
      <Slider
        getAriaLabel={() => 'Price range'}
        value={props.sliderValue}
        onChange={props.handleChange}
        // min={MIN}
        // max={MAX} 
        min = {0}
        max = {500}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        marks={marks}
        
      />
    </Box>
  )
    
  }


export default Sliders