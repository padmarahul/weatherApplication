import React , { useState }from 'react';
import {Typography ,Grid,SvgIcon,ToggleButtonGroup,ToggleButton} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import './CurrentWeather.css';


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
const style = {
    width: '100%',
    maxWidth: 600,
    marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2px 0 2px'
  };
  const itemstyle ={
    fontSize: { xs: '20px', sm: '24px' },
    fontWeight: { xs: '200', sm: '400' },
    color: 'white',
    fontFamily: 'Poppins',
    lineHeight: 1
  };
  
  const subitemstyle={
        
                  alignItems: 'center',
                  justifyContent: 'center',
  }
  
  
  
const CurrentWeather=({data})=>
{
    const [temp,setTemp]=useState(null)
    const handleToggleChange = (e, value) => {
        setTemp(value)
    }
return(
    <>
     <h3 style={{ 
                fontSize: { xs: '12px', sm: '16px', md: '18px' },
                color: 'rgba(255,255,255,.7)',
                fontWeight: '600',
                lineHeight: 1,
                marginLeft: "15%",
                marginTop: "2%",
                fontFamily: 'Roboto Condensed',}}>
                  CURRENT WEATHER
    </h3>
    <ToggleButtonGroup
  orientation="horizantal"
  value={temp}
  sx={{
    justifyContent: 'center',
    marginTop: '0%',
     marginLeft : '10%'
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
     <List sx={style}>
     <ListItem>
     <Typography
        variant="p"
        component="p"
        sx={itemstyle}>
             <Grid container spacing={{ xs: 6, md: 6}} columns={{ xs: 12, sm: 12, md: 12 }}>
          <Grid item xs={6} sm={6} md={6} sx={subitemstyle}>
          <div className="flex-container">
      <div className="item1"> {data.city} </div>
      <div className="item2"> Today {datefunc(data.date)}</div>
    </div>
          </Grid>
          <Grid item xs={6} sm={6} md={6} sx={subitemstyle}>
          <div className="flex-container">
          <div className="item"> { temp=='celsius' ?(data.tempc ): (data.tempf)} 
          { temp=='celsius' ?(" °C "): (" °F")} 
          </div>
      <div className="item2"> {data.condition.text}</div>
    </div>
          </Grid>
          <Grid item xs={6} sm={6} md={6} sx={subitemstyle}>
          <div className="flex-container">
      <div className="item1"> {data.humidity} %</div>
      <div className="item2">Humidity </div>
    </div>
          </Grid>
          <Grid item xs={6} sm={6} md={6} sx={subitemstyle}>
          <div className="flex-container">
      <div className="item1"> {data.wind} m/s</div>
      <div className="item2">Wind </div>
    </div>
          </Grid>
          <Grid item xs={6} sm={6} md={6} sx={subitemstyle}>
          <div className="flex-container">
      <div className="item1"> {data.cloud} %</div>
      <div className="item2">Clouds </div>
    </div>
          </Grid>
          <Grid item xs={6} sm={6} md={6} sx={subitemstyle}>
          <div className="flex-container">
      <div className="item1"> 
      <img  className="imagefont" src={data.condition.icon} alt="Logo" />
      </div>
    </div>
          </Grid>
          </Grid>
            </Typography>
      </ListItem>
     </List>
    </>
);
}



export default CurrentWeather;