import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import WeatherData from './WeatherData';
import { useGlobalContext } from '../context';

const MainPanel = () => {

    const {functions: { handleWeather, handleChangeCity },
           data: { weatherData, selectedCity } } = useGlobalContext();

    return (
        <article className='weather__article main-panel'>
            <div className='main-panel__search'>
                <input onChange={handleChangeCity} className='main-panel__search__input'></input>
                <AiOutlineSearch onClick={handleWeather}  className='main-panel__search__icon'></AiOutlineSearch>
            </div>
            {weatherData ? <WeatherData data={weatherData}/> : 
                selectedCity && (
                <div className='searching'>
                    searching for a city
                </div>
                )
            
            }
        </article>
    );
};

export default MainPanel;