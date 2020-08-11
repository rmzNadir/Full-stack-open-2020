import React from "react";
import Person from "./Person";

const Persons = (props) => {
  const { persons } = props;
  return persons.map((person) => <Person key={person.name} person={person} />);
};

export default Persons;
