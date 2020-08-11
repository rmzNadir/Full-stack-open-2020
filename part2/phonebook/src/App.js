import React, { useState } from "react";
import Persons from "./components/Persons"
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: "Arto Hellas",
      phone: "1232123589",
    },
    {
      name: "John Cena",
      phone: "112312313",
    },
    {
      name: "Sentient Rock",
      phone: "1231534123",
    },
    {
      name: "John Wick",
      phone: "1892391702",
    },
    {
      name: "Non-Sentient Rock",
      phone: "123131312456",
    },
    {
      name: "Michael Jordan",
      phone: "89123891",
    },
    {
      name: "Just Michael",
      phone: "982973092",
    },
  ]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [newQuery, setNewQuery] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already registeded`);
    } else {
      const personObject = {
        name: newName,
        phone: newPhone,
      };

      setPersons(persons.concat(personObject));
      //console.log(persons)
      setNewName("");
      setNewPhone("");
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
      <Persons persons={persons}/>
    </div>
  );
};

export default App;
