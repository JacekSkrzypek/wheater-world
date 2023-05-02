import React, {useContext, useEffect, useState} from "react";
import axios from 'axios';

const AppContext = React.createContext();

export const AppProvider = ({children}) => {
    const [selectedCity, setSelectedCity] = useState('');
    const [citiesList, setCitiesList] = useState([]);
    const [weatherData, setWeatherData] = useState();
    const [citiesData, setCitiesData] = useState([]);


    const apiKey = process.env.REACT_APP_API_KEY;

    const handleWeather = () => {
        getWeather(selectedCity)
        .then(res => {setWeatherData(res)});
    }

    const getWeather = (city) => {
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleChangeCity = (event) => {
        setSelectedCity(event.target.value);
    }

    useEffect(() => {
        const weatherList = [];
        citiesList.map((city) => {
           getWeather(city)
            .then(res => {
                weatherList.push(res);
                setCitiesData(weatherList);
            });
        })

      }, [citiesList]);


      useEffect(() => {
        const cities = ["Poznań", "Warszawa", "Babimost"];
        setCitiesList(cities);
      }, [])

    const data = {
        citiesData,
        selectedCity,
        citiesList,
        weatherData
    }

    const functions = {
        setSelectedCity,
        handleChangeCity,
        handleWeather, 
        getWeather,
        setSelectedCity
    }

    return <AppContext.Provider value={{data, functions}}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    const context = useContext(AppContext);
    if(context === undefined) {
        throw new Error('useContext must be used within a appProvider')
    }
    return context;
}

export default { AppContext, AppProvider}