import React from "react";
import Person from "./Person";

const Persons = (props) => {
  const { persons, handleDelete } = props;
  return persons.map((person) => <Person key={person.name} person={person} handleDelete={handleDelete} />);
};

export default Persons;
