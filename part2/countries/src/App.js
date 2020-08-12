import React, {useState, useEffect} from 'react';
import Axios from 'axios'
import Filter from './components/Filter'

function App() {
  const [countries, setCountries] = useState([])
  const [input, setInput] = useState("")
  const [search, setSearch] = useState([])

  useEffect(() => {
    Axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data) 
      console.log("request done")})
  },[])

  const handleSearchInput = (e) => {
    setInput(e.target.value)
    let search = countries.filter((country)=>(country.name.localeCompare(e.target.value,undefined, {sensitivity:"base"}) === 0 || country.name.toUpperCase().includes(e.target.value.toUpperCase()))&&e.target.value!=="")
    setSearch(search)
  }


  return (
    <div className="App">
      <Filter input={input} handleSearchInput={handleSearchInput} search={search}/>
    </div>
  );
}

export default App;
