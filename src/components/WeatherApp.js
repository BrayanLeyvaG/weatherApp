import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const WeatherApp = () => {

    const [weatherData, setWeatherData] = useState({})

    const success = pos => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude

        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9e0afc9f53fbbb8774feed35e0ea76d6`)
        .then(res => {
            console.log(res.data)
            setWeatherData(res.data)
        })
        
    }
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success)
    
    }, [])




  return (
    <div>
        <h1>WeatherApp</h1>
        <h2>{weatherData.name}</h2>
        <h3>{weatherData.sys?.country}</h3>
        <img src={`http://openweathermap.org/img/wn/${weatherData.weather?.[0].icon}@2x.png`}></img>
        <p>{Math.round(weatherData.main?.temp-273.1)} °C</p>
        <button>To fahrenheit</button>
    </div>
  )
}
