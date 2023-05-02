import React from 'react';

const WeatherData = ({data}) => {

        const {name} = data;
        const { main: {temp} } = data;
        const { icon, description } = data.weather[0]
       // console.log(data.weather[0]);
    return (
        
        <div className='weather-data'>
            <h1 className='weather-data__city-name'>{name}</h1>
            <div className='weather-data__container'>
                <div className='weather-data__container__block'>
                    <img className='weather-data__container__block__image' src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
                </div>
                <div className='weather-data__container__block'>
                    <p className='weather-data__container__block__temp'>
                        {Math.round(temp - 273.15)}°C
                    </p>
                </div>
                <div className='weather-data__container__block'>
                    <img className='weather-data__container__block__image' src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
                </div>
            </div>
            <div className='weather-data__description'>
                {description}
            </div>
        </div>
    );
};

export default WeatherData;