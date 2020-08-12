import React from 'react'

const Country = (props) => {
    //console.log(props.country)
    //console.log(props)
    const {name, capital, population, languages, flag} = props.country
    return (
        <div>
            <h1>{name}</h1>
            Capital: {capital}
            <br/>
            Population: {population}
            <ul>
              {languages.map((language)=><li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={flag} alt={`${name}'s flag`} width="300" height="175"/>
        </div>
    )
}

export default Country
