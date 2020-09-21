import React from 'react'
import Person from './Person'

const Filter = (props) => {
    const {newSearch,handleSearchInput,newQuery} = props
    return (
        <div>
            Search a person: <input value={newSearch} onChange={handleSearchInput} placeholder='Insert first or last name'/>
            <br/>
            <br/>
            {newQuery.map(person=><Person key={person.name} person={person}/>)}
        </div>
    )
}

export default Filter
