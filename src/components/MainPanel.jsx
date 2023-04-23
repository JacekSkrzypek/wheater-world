import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';
import WeatherData from './WeatherData';


const MainPanel = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState();

    const handleWeather = () => {
        const apiKey = process.env.REACT_APP_API_KEY;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then(res => {
                setWeatherData(res.data);
            })
    }

    const handleChangeCity = (event) => {
        setCity(event.target.value);
    }

    return (
        <article className='weather__article main-panel'>
            <div className='main-panel__search'>
                <input onChange={handleChangeCity} className='main-panel__search__input'></input>
                <AiOutlineSearch onClick={handleWeather}  className='main-panel__search__icon'></AiOutlineSearch>
            </div>
            {weatherData && <WeatherData data={weatherData}/>}
        </article>
    );
};

export default MainPanel;