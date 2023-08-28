

const WEATHER_API_URL = 'https://api.weatherapi.com/v1';
const WEATHER_API_KEY = '8769982d2a374fc88c5152633232808';



export async function fetchWeatherData(input,days) {
  try {
    let [weatherPromise, forcastPromise] = await Promise.all([
      fetch(
        `${WEATHER_API_URL}/current.json?key=${WEATHER_API_KEY}&q=${input}&aqi=no`
      ),
      fetch(
        `${WEATHER_API_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${input}&days=${days}&aqi=no&alerts=no`
      ),
    ]);

    const weatherResponse = await weatherPromise.json();
    const forcastResponse = await forcastPromise.json();
    return [weatherResponse, forcastResponse];
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCities(input) {
  try {
    const response = await fetch(
      `${WEATHER_API_URL}/search.json?key=${WEATHER_API_KEY}&q=${input}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}
