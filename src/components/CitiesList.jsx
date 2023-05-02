import React, { useState } from 'react';
import { useGlobalContext } from '../context';


const CitiesList = () => {
    const { data: { citiesList, citiesData }, 
            functions: { getWeather } } = useGlobalContext();
    



    return (
        <article className='weather__article weather__cities'>
            <ul>
                {citiesList.map((city, i) => {   
                       const { icon, description } = citiesData[i].weather[0];
                        return (
                            <li className='weather__cities__city'>
                                <p>{city}</p>
                                <p>{description}</p>
                            </li>
                          );
                })}
            </ul>
        </article>
    );
};

export default CitiesList;