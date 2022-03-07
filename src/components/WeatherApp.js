import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './WeatherApp.css'

export const WeatherApp = () => {

    const [weatherData, setWeatherData] = useState({})

    const success = pos => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9e0afc9f53fbbb8774feed35e0ea76d6`)
        .then(res => {
            setWeatherData(res.data)
            setDegrees(Math.round(res.data.main?.temp-273.1))
        })
        
    }
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success)
        
    }, [])
    
    const fahrenheit = Math.round((weatherData.main?.temp-273.15)*(9/5)+32)

    const celsius = Math.round(weatherData.main?.temp-273.1)

    const [degrees, setDegrees] = useState(0)
    const [isCelsius, setIsCelsius] = useState(true)


    function convert() {
        if(isCelsius){
            setDegrees(fahrenheit)
            setIsCelsius(false)      
        }else{
            setDegrees(celsius)
            setIsCelsius(true)      
        }
    }

    


  return (
    <div className='all'>
        <h1>Weather App</h1>
        <div className='card'>
            <h2>{weatherData.name}</h2>
            <h3>{weatherData.sys?.country}</h3>
            <div className='center'>
                <img src={`http://openweathermap.org/img/wn/${weatherData.weather?.[0].icon}@2x.png`}></img>
                <p>{degrees} {isCelsius? '°C' : '°F'}</p>
            </div>
            <button onClick={convert}>To {isCelsius? 'fahrenheit' : 'celsius'}</button>
        </div>
    </div>
  )
}
