import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

import commService from "./services/communication";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [newQuery, setNewQuery] = useState([]);

  useEffect(() => {
    commService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const personObject = {
      name: newName,
      phone: newPhone,
    };

    if (persons.find((person) => person.name === newName)) {
      const PersonToUpdate = persons.find((person) => person.name === newName)
      //console.log(PersonToUpdate)
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        commService.update(PersonToUpdate.id,personObject).then(response => {
          setPersons(persons.map(person => person.id !== PersonToUpdate.id ? person : response.data))
          setNewName("");
          setNewPhone("");
        })
      }
    } else {
      commService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data));
        //console.log(persons)
        setNewName("");
        setNewPhone("");
      });
    }
  };

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneInput = (e) => {
    setNewPhone(e.target.value);
  };

  const handleSearchInput = (e) => {
    setNewSearch(e.target.value);
    let search = persons.filter(
      (person) =>
        (person.name.localeCompare(e.target.value, undefined, {
          sensitivity: "base",
        }) === 0 ||
          person.name.toUpperCase().includes(e.target.value.toUpperCase())) &&
        e.target.value !== ""
    );
    /*the line above filters through the persons array and checks every name property inside the array list to see if either the stored name is exactly the same as the input or if the stored name includes what is currently in the input field*/
    //console.log(search)
    setNewQuery(search);
  };

  const handleDelete = (person) =>{
    //console.log(person)
    if(window.confirm(`Are you sure you want to delete ${person.name}?`)){
      commService.remove(person.id).then(
        setPersons(persons.filter(p => p.id !== person.id)),
        //console.log(persons)
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        newSearch={newSearch}
        newQuery={newQuery}
        handleSearchInput={handleSearchInput}
      />
      {/*we call the Filter component while passing state and an event handler as props*/}
      <h2>Add New Person</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newPhone={newPhone}
        handleNameInput={handleNameInput}
        handlePhoneInput={handlePhoneInput}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
