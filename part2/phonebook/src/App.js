import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification"
import "./App.css"

import commService from "./services/communication";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [newQuery, setNewQuery] = useState([]);
  const [notification, setNotification] = useState([])

  useEffect(() => {
    commService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const successMessage = (operation) => {
    const successObject = {
      content: `${newName} has been successfully ${operation}!`,
      type: "success"
    }
    setNotification(successObject)
    setTimeout(()=>{
      setNotification([])
    },3000)
  }

  const errorMessage = (personName) =>{
    const errorObject = {
      content: `${personName}'s info has already been removed from the server!`,
      type: "error"
    }
    setNotification(errorObject)
    setTimeout(()=>{
      setNotification([])
    },3000)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

 

    if(persons.find((person) => person.phone === newPhone )){
      if(window.confirm(`${newPhone} is already assigned, try something else!`)){
        return
      }
      return
    }

    if (persons.find((person) => person.name === newName)) {
     
    let PersonToUpdate = persons.find((person) => person.name === newName)

    const updatedPersonObject = {
      name: newName,
      phone: newPhone,
      id: PersonToUpdate.id || null,
    };
      //console.log(PersonToUpdate)
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        commService.update(PersonToUpdate.id,updatedPersonObject).then(response => {
          //console.log(response)
          setPersons(persons.map(person => person.id !== PersonToUpdate.id ? person : response.data))
          setNewName("");
          setNewPhone("");
          successMessage("updated")
          //console.log(persons)
          //console.log(notification)
        }).catch(error => {
          errorMessage(newName)
          console.log(error)
          setPersons(persons.filter(person => person.name !== newName))
          setNewName("");
          setNewPhone("");
        })
      }
    } else {
      const newPersonObject = {
        name: newName,
        phone: newPhone,
      };
      commService.create(newPersonObject).then((response) => {
        //console.log(response)
        setNewName("");
        setNewPhone("");
        setPersons(persons.concat(response.data));
        successMessage("added")
        //console.log(persons)
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
      .catch(error => {
        console.log(error)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
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
