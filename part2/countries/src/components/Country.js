import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import GoBack from './GoBack'

const Country = (props) => {
    const [weather, setWeather] = useState("")
    //console.log(props.country)
    //console.log(props
    const {name, capital, population, languages, flag} = props.country

    useEffect(() => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY
      Axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}`) 
            .then(response=>{
              //console.log(response.data.current)
              setWeather(response.data.current)
            })
    },[capital])
    


         

    return (
        <div>
            <h1>{name}</h1>
            Capital: {capital}
            <br/>
            Population: {population}
            <ul>
              {languages.map((language)=><li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={flag} alt={`${name}'s flag`} width="215" height="175"/>
            <br/>
            <h3>Weather in {capital}</h3>
            <strong>Temperature: </strong> {weather.temperature} °C
            <br/>
            <img src={weather.weather_icons} alt="weather icon"/>
            <br/>
            <strong>Wind: </strong> {weather.wind} Km/h, direction {weather.wind_dir}
            <br/>
            <GoBack handleBack={props.handleBack}/>
            {console.log(weather)}
        </div>
    )
}

export default Country
