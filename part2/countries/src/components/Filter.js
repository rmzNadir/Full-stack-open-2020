import React from 'react'
import Country from './Country'


const Filter = (props) => {
    const {input,handleSearchInput,search,handleClick,selected, handleBack} = props
    //console.log(search)
    //console.log("test")

    const checkFilter = (search) => {
        if(selected){
            return <Country key={selected.capital} country={selected} handleBack={handleBack}/>
         }


        if(search.length>10){
            return <p>Too many matches, specify another filter</p>
        }else if(search.length>1&&search.length<=10){
            return search.map(country => <div key={country.name}>
                {country.name} <button id={country.name} onClick={handleClick}>Details</button>
            </div>)
        }else if(search.length===1){
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

