import React from "react";
import Person from "./Person";

const Persons = (props) => {
  const { persons, handleDelete } = props;
  //console.log(persons)
  return persons.map((person) => <Person key={person.phone} person={person} handleDelete={handleDelete} />);
};

export default Persons;
