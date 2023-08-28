import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Footer from "./components/Footer";
//import ToTheTopButton from "./components/ToTheTopButton/ToTheTopButton"
import { Box, Container, Grid, Link, SvgIcon, Typography,ToggleButtonGroup,ToggleButton } from '@mui/material';
import {fetchWeatherData} from "./services/WeatherServices"
import Search from "./components/Search/Search"
import GitHubIcon from '@mui/icons-material/GitHub';
import { ReactComponent as SplashIcon } from './assets/splash-icon.svg';
import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast'
import CurrentWeather from './components/CurrentWeather/CurrentWeather'
import CircularProgress from '@mui/material/CircularProgress';
function App() {
    const [loading, setLoading]= useState(false)
    const [todayWeather, setTodayWeather]=useState(null)
    const [error, setError]=useState(null)
    const [weekForecast, setWeekForecast]=useState(null)
    
  const getWeekForecast=(response)=>
  { const forecast_data=[];
  
   
    for(var i=0;i<response.forecast.forecastday.length;i++)
    {
      for(var j=0;j<24;j++)
        {
      forecast_data.push(
        {
          date: response.forecast.forecastday[i].date.substring(0,10),
          temp: response.forecast.forecastday[i].hour[j].temp_c,
         wind: response.forecast.forecastday[i].hour[j].wind_mph,
         humidity: response.forecast.forecastday[i].hour[j].humidity,
         clouds: response.forecast.forecastday[i].hour[j].cloud
        }
      ) 
        }
    }
    const groupedByDate= groupBy(forecast_data, 'date');
    //console.log(groupedByDate); 
    const tempkeys=Object.keys(groupedByDate);
    const finallist=[];
    tempkeys.forEach((key,idx)=>
    {
      let dayTempsList = [];
      let dayHumidityList = [];
      let dayWindList = [];
      let dayCloudsList = [];
  
      for (let i = 0; i < groupedByDate[key].length; i++) {
        dayTempsList.push(groupedByDate[key][i].temp);
        dayHumidityList.push(groupedByDate[key][i].humidity);
        dayWindList.push(groupedByDate[key][i].wind);
        dayCloudsList.push(groupedByDate[key][i].clouds);
      }
      finallist.push({
        date: key,
        temp: getAverage(dayTempsList),
        humidity: getAverage(dayHumidityList),
        wind: getAverage(dayWindList, false),
        clouds: getAverage(dayCloudsList),
        //description: groupedByDate[key]
      });
    })
    console.log(finallist)
    setWeekForecast(finallist)
  }

  const getAverage=(array, isRound = true) =>{
    let average = 0;
    if (isRound) {
      average = Math.round(array.reduce((a, b) => a + b, 0) / array.length);
      if (average === 0) {
        average = 0;
      }
    } else average = (array.reduce((a, b) => a + b, 0) / array.length).toFixed(2);
  
    return average;
  }

  const groupBy=(jsonArray, key) =>{
    return jsonArray.reduce((result, currentItem) => {
      const groupKey = currentItem[key];
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(currentItem);
      return result;
    }, {});
  }

  const getTodayWeather=(response)=>
  {
     var currentresponse={
      cloud:response.current.cloud,
    condition:response.current.condition,
     humidity:response.current.humidity,
     tempc:response.current.temp_c,
    tempf:response.current.temp_f,
     wind:response.current.wind_mph,
    city:response.location.name,
    date:response.location.localtime
     };
return currentresponse;
  };
  
  const searchChangeHandler = async (enteredData) => {
    const [latitude, longitude] = enteredData.value.split(' ');
    setLoading(true);
    try {
      const [todayWeatherResponse, weekForecastResponse] =
        await fetchWeatherData(enteredData.label,6);
        const resp=getTodayWeather(todayWeatherResponse)
        setTodayWeather(resp)
          getWeekForecast(weekForecastResponse);
    } catch (error) {
      setError(error)
      console.log(error)
    }

    setLoading(false);
  };
  let appContent = (
    <Box
      xs={12}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100%',
        minHeight: '500px',
      }}
    >
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: { xs: '12px', sm: '14px' },
          color: 'rgba(255,255,255, .85)',
          fontFamily: 'Poppins',
          textAlign: 'center',
          margin: '2rem 0',
          maxWidth: '80%',
          lineHeight: '22px',
        }}
      >
        Explore current weather data and 6-day forecast of more than 200,000
        cities!
      </Typography>
    </Box>
  );
  if (todayWeather&&weekForecast) {
    appContent = (
      <>
      <React.Fragment>
        <Grid item xs={12} md={6}>
          <CurrentWeather data={todayWeather} />
        </Grid>
      <Grid item xs={12} md={6}>
        <WeeklyForecast data={weekForecast} />
        </Grid>
    </React.Fragment>
    </>
    );
  }


  if (loading) {
    appContent = (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          minHeight: '500px',
        }}
      >
         <CircularProgress sx={{ color: 'rgba(255,255,255, .8)' }}/>
        <Typography

            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: '10px', sm: '12px' },
              color: 'rgba(255, 255, 255, .8)',
              lineHeight: 1,
              fontFamily: 'Poppins',
            }}
          >
            Loading...
            </Typography>
      </Box>
    );
  }
  return (
    <>
    <Container
    sx={{
      maxWidth: { xs: '95%', sm: '80%', md: '1100px' },
      width: '100%',
      height: '100%',
      margin: '0 auto',
      padding: '1rem 0 3rem',
      marginBottom: '1rem',
      borderRadius: {
        xs: 'none',
        sm: '0 0 1rem 1rem',
      },
      boxShadow: {
        xs: 'none',
        sm: 'rgba(0,0,0, 0.5) 0px 10px 15px -3px, rgba(0,0,0, 0.5) 0px 4px 6px -2px',
      },
    }}
  >
    <Grid container columnSpacing={2}>
        <Grid item xs={12}>
      
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              width: '100%',
              marginBottom: '1rem',
            }}
          >
            <Link
              href="https://github.com/padmarahul/weatherApplication"
              target="_blank"
              underline="none"
              sx={{ display: 'flex', marginLeft :'95%' }}
            >
              <GitHubIcon
                sx={{
                  fontSize: { xs: '20px', sm: '22px', md: '26px' },
                  color: 'white',
                  '&:hover': { color: '#2d95bd' },
                }}
              />
            </Link>
          </Box>
          <Search onSearchChange={searchChangeHandler} />
        </Grid>
        {appContent}
      </Grid>
    {/* <ToTheTopButton/> */}
    </Container><Footer/>
    </>
  );
}

export default App;
