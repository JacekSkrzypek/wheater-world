import React, { useState } from 'react';
import { useGlobalContext } from '../context';


const CitiesList = () => {
    const { data: { citiesList, citiesData }, 
            functions: { getWeather } } = useGlobalContext();
    



    return (
        <article className='weather__article weather__cities'>
            <ul>
                {citiesList.map((city, i) => {   
                        try {
                            const { main: {temp} } = citiesData[i];
                            const { icon } = citiesData[i].weather[0];
                            return (
                                <li className='weather__cities__city'>
                                    <p>{city}</p>
                                    <div className='weather__cities__city__information'>
                                        <img className='weather__cities__city__information__icon' src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
                                        <p>{Math.round(temp - 273.15)}°C</p>
                                    </div>
                                </li>
                              );
                        }
                        catch {
                            console.log("error")
                        }
                       
                })}
            </ul>
        </article>
    );
};

export default CitiesList;