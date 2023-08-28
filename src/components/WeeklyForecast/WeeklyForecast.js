import React , { useState }from 'react';
import {Typography ,Grid,SvgIcon,ToggleButtonGroup,ToggleButton} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AirIcon from '@mui/icons-material/Air';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { ReactComponent as HumidityIcon } from '../../assets/humidity.svg';
import './WeeklyForecast.css';
const style = {
  width: '100%',
  maxWidth: 600,
  bgcolor: 'blue',
  marginTop: '2%',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '2px 0 2px',
      background:
        'linear-gradient(0deg, rgba(255, 255, 255, .05) 0%, rgba(171, 203, 222, .05) 100%) 0% 0%',
      boxShadow:
        'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      borderRadius: '8px'
};

const itemstyle ={
  fontSize: { xs: '12px', sm: '13px' },
  fontWeight: { xs: '400', sm: '600' },
  color: 'white',
  fontFamily: 'Poppins',
  lineHeight: 1
};

const subitemstyle={
      
                alignItems: 'center',
                justifyContent: 'center',
}

const imagefont={
fontSize: { xs: '15px', sm: '16px', md: '18px' } 
}

const datefunc =(data)=>{
  var time = Date.parse(data.toString());
  var date= new Date(time);
  var day=date.toLocaleString('en-us', {weekday:'long'})
let month=date.toLocaleString("en-US", { month: "long" })
let finalmon=month.substring(0,month.length);
let date1=data.substring(8,10);
let dayMonth=date1+" "+finalmon;
return dayMonth;
};

const dayfunc=(data)=>
{
  var time = Date.parse(data.toString());
  var date= new Date(time);
  var day=date.toLocaleString('en-us', {weekday:'long'})
  return day;
};

const WeeklyForecast=({ data }) =>{
  const [temp, setTemp]=useState(null);
  const handleToggleChange = (e, value) => {
    setTemp(value)
}
return (
  <>
   <Grid xs={12}
      sx={{
        marginTop: '2%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}>
  <h3 style={{textAlign: 'center',
                fontSize: { xs: '12px', sm: '16px', md: '18px' },
                color: 'rgba(255,255,255,.7)',
                fontWeight: '600',
                lineHeight: 1,
                marginTop: "0%",
                fontFamily: 'Roboto Condensed',}}>
                  WEEKLY FORECAST
    </h3>
    <ToggleButtonGroup
  orientation="horizantal"
  value={temp}
  sx={{
    justifyContent: 'center',
    marginTop: '0%'
  }}
      onChange={handleToggleChange }
      name="temp" 
      id="temp-select"
      exclusive={true}
>
  <ToggleButton  sx={{
                  fontSize: { xs: '12px', sm: '14px', md: '16px' },
                  color: 'white',
                  '&:hover': { color: '#000000' },
                }} value="celsius" aria-label="celsius">
  Celsius
  </ToggleButton>
  <ToggleButton sx={{
                  fontSize: { xs: '12px', sm: '14px', md: '16px' },
                  color: 'white',
                  '&:hover': { color: '#000000' },
                }} value="farhenheit" aria-label="farhenheit">
  Farhenheit
  </ToggleButton>
</ToggleButtonGroup>
  <List sx={style} component="nav" aria-label="mailbox folders">
      {data.map((item,idx)=>
      { 
        return(
          <>
         <ListItem>
        <Typography
        variant="p"
        component="p"
        sx={itemstyle}>
          <Grid container spacing={{ xs: 2, md: 2}} columns={{ xs: 12, sm: 12, md: 12 }}>
          <Grid item xs={4} sm={4} md={4} sx={subitemstyle}>
           {dayfunc(item.date)}
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={subitemstyle}>
          <div className="flex-containers">
      <div className="items">  <ThermostatIcon
        sx={imagefont}
      /> </div>
      <div className="items"> {`${ temp=='celsius' ?(item.temp ):  Math.round((1.8*(item.temp) + 32))} `} 
      {temp=='celsius' ? ("°C"):("°F")}
      </div>
    </div>
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={subitemstyle}>
        <div className="flex-containers">
      <div className="items">  <AirIcon
        sx={imagefont}
      /> </div>
      <div className="items"> {item.wind} m/s</div>
    </div>
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={subitemstyle}>
            {datefunc(item.date)}
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={subitemstyle}>
          <div className="flex-containers">
      <div className="items">  <FilterDramaIcon
        sx={imagefont}
      /> </div>
      <div className="items"> {item.clouds} %</div>
    </div>
          </Grid>
          <Grid item xs={4} sm={4} md={4} sx={subitemstyle}>
          <div className="flex-containers">
      <div className="items">  <SvgIcon
          component={HumidityIcon}
          inheritViewBox
          sx={imagefont}
        /> </div>
      <div className="items"> {item.humidity} %</div>
    </div>
          </Grid>
          
      </Grid>
      </Typography>
      </ListItem>
      {idx < data.length - 1 && <Divider variant="inset" component="li"/>}
       </>
     ); })}
  </List>
  </Grid>
 </>
)
};

export default WeeklyForecast