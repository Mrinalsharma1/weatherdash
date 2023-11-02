import React, { useState } from 'react'
import './weatherapp.css'
import search_icon from '../Assets/search.png';
import cloud_icon from '../Assets/cloud.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'
import clear_icon from '../Assets/clear.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import { useSelector } from 'react-redux'


function Weatherapp() {
    const [searchCity, setSearchCity] = useState('Patna')
    const [wicon, setWicon] = useState(cloud_icon)
    const authState = useSelector(state => state.authState)
    // console.log("AuthState1 token", authState);


    const handleInputCity = (e) => {
        setSearchCity(e.target.value)
    }


    const search = async () => {
        if (searchCity.length <= 0) {
            return 0;
        }
        const url = `http://localhost:5000/weather?cityName=${searchCity}`
        const response = await fetch(url, {
            headers: {
                'Authorization': authState.auth.token
            },
            // authState.auth.token
        });
        const data = await response.json();
        if (response.status === 200) {
            const humidity = document.getElementsByClassName('humidity-percent')
            const wind = document.getElementsByClassName('wind-rate')
            const temprature = document.getElementsByClassName('weather-temp')
            const location = document.getElementsByClassName('weather-location')
            humidity[0].innerHTML = data.result.main.humidity + " %";
            wind[0].innerHTML = Math.floor(data.result.wind.speed) + " Km/h";
            temprature[0].innerHTML = Math.floor(data.result.main.temp) + "°C";
            location[0].innerHTML = data.result.name;

            if (data.result.weather[0].icon === '01d' || data.result.weather[0].icon === '01n') {
                setWicon(clear_icon)
            } else if (data.result.weather[0].icon === '02d' || data.result.weather[0].icon === '02n') {
                setWicon(cloud_icon)
            } else if (data.result.weather[0].icon === '03d' || data.result.weather[0].icon === '03n') {
                setWicon(drizzle_icon)
            } else if (data.result.weather[0].icon === '04d' || data.result.weather[0].icon === '04n') {
                setWicon(drizzle_icon)
            } else if (data.result.weather[0].icon === '09d' || data.result.weather[0].icon === '09n') {
                setWicon(rain_icon)
            } else if (data.result.weather[0].icon === '13d' || data.result.weather[0].icon === '13n') {
                setWicon(snow_icon)
            } else {
                setWicon(clear_icon)
            }
        } else {
            alert("Failed to get weather details!..");
        }
    }
    return (
        <>
            <div className='wheather-container mt-4'>
                <div className='top-bar'>
                    <input type='text' className='cityInput' name='city' value={setSearchCity.city} onChange={handleInputCity} placeholder='Search' />
                    <div className='search-icon' onClick={() => { search() }}>
                        <img src={search_icon} alt='search-icon' />
                    </div>
                </div>
                <div className='weather-image'>
                    <img src={wicon} alt='cloud_icon' />
                </div>
                <div className='weather-temp'>24°C</div>
                <div className='weather-location'>London</div>
                <div className='data-container'>
                    <div className='element'>
                        <img src={humidity_icon} alt='humidity-icon' className='icon' />
                        <div className='data'>
                            <div className='humidity-percent'>64%</div>
                            <div className='text'>Humidity</div>
                        </div>
                    </div>
                    <div className='element'>
                        <img src={wind_icon} alt='wind-icon' className='icon' />
                        <div className='data'>
                            <div className='wind-rate'>64%</div>
                            <div className='text'>Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Weatherapp