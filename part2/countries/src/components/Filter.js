import React from 'react'
import Country from './Country'


const Filter = (props) => {
    const {input,handleSearchInput,search} = props
    //console.log(search)

    const checkFilter = (search) => {
        if(search.length>10){
            return <p>Too many matches, specify another filter</p>
        }else if(search.length>1){
            return search.map(country => <p key={country.name}>{country.name}</p>)
        }else{
            return search.map(country=><Country key={country.capital} country={country}/>)
        }
    }
    
    return (
        <div>
            Search a Country: <input value={input} onChange={handleSearchInput}/>
            <br/>
            <br/>
            {checkFilter(search)}
        </div>
    )
}

export default Filter

