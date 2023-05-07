import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context';


const CitiesList = () => {
    const { data: { citiesList, citiesData, selectedCity }, 
            functions: { setSelectedCity, handleWeather, getWeather, setCitiesList } } = useGlobalContext();
            const [weatherData, setWeatherData] = useState([]);
  
            const handleSelectCity = (city) => {
              setSelectedCity(city);
            };
          
            useEffect(() => {
              const fetchWeatherData = async () => {
                const weatherData = await Promise.all(citiesList.map((city) => getWeather(city)));
                setWeatherData(weatherData);
              };
              fetchWeatherData();
            }, [citiesList]);
            
            return (
              <article className='weather__article weather__cities'>
                {citiesList !== null && (
                  <ul>
                    {weatherData.map((data, i) => {
                      const city = citiesList[i];
                      const icon = data.weather[0].icon;
                      const temp = data.main.temp;
                      return (
                        <li
                          className='weather__cities__city'
                          onClick={() => handleSelectCity(city)}
                          key={i}
                        >
                          <p>{city}</p>
                          <div className='weather__cities__city__information'>
                            <img
                              className='weather__cities__city__information__icon'
                              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                              alt=''
                            />
                            <p>{Math.round(temp - 273.15)}°C</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </article>
            );
          };

export default CitiesList;