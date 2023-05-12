import React, {useContext, useEffect, useState} from "react";
import axios from 'axios';

const AppContext = React.createContext();

export const AppProvider = ({children}) => {
    const cities = ["Poznań", "Włoszczowa", "Sochaczew"];

    const [selectedCity, setSelectedCity] = useState('');
    const [citiesList, setCitiesList] = useState(JSON.parse(localStorage.getItem("citiesList") || cities));
    const [weatherData, setWeatherData] = useState();
    const [citiesData, setCitiesData] = useState([]);
    const [timeoutId, setTimeoutId] = useState(null);

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

    const getCitiesData = () => {
        console.log(citiesData)
        const weatherList = [];
        citiesList.map((city) => {
            getWeather(city)
             .then(res => {
                 weatherList.push(res);
             }).then(res => {
                 setCitiesData(weatherList);
             });
         })
    }

    const handleChangeCity = (event) => {
        setSelectedCity(event.target.value);
    }

    const addCity = (city) => {
        setCitiesList(prev => prev.concat(city));
        getCitiesData();
    }

    const removeCity = (city) => {
        const list = citiesList.filter(name => name !== city);
        setCitiesList(prev => list);
    }

    
      useEffect(() => {

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const id = setTimeout(() => {
        handleWeather();
            
          }, 400);

        setTimeoutId(id);


      }, [selectedCity])

      useEffect(() => {
        localStorage.setItem("citiesList", JSON.stringify(citiesList));
      }, [citiesList])

      useEffect(() => {
            setTimeout(5000, () => {
                getCitiesData();
            })
      }, [])

    const data = {
        citiesData,
        selectedCity,
        citiesList,
        weatherData
    }

    const functions = {
        addCity,
        removeCity,
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