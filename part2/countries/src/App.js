import React, {useState, useEffect} from 'react';
import Axios from 'axios'
import Filter from './components/Filter'

function App() {
  const [countries, setCountries] = useState([])
  const [input, setInput] = useState("")
  const [search, setSearch] = useState([])
  const [selected, setSelected] = useState("")

  useEffect(() => {
    Axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data) 
      console.log("request done")})
  },[])

  

  const handleClick = (e) => {
    const countryId = e.target.id
    const country = countries.find(country=>country.name===countryId)
    //console.log(country.name)
    setSelected(country)

  }

  const handleBack = () => {
    //console.log("click")
    //setInput("")
    setSelected("")
  }

  const handleSearchInput = (e) => {
    setInput(e.target.value)
    let search = countries.filter((country)=>(country.name.localeCompare(e.target.value,undefined, {sensitivity:"base"}) === 0 || country.name.toUpperCase().includes(e.target.value.toUpperCase()))&&e.target.value!=="")
    setSearch(search)
  }


  return (
    <div className="App">
      <Filter input={input} handleSearchInput={handleSearchInput} search={search} selected={selected} handleClick={handleClick} handleBack={handleBack}/>
    </div>
  );
}

export default App;
