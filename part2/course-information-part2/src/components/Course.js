import React from 'react'

const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    );
  };

  const Part = (props) => {
    const {parts} = props;
    return (
      <div>
        <p>
          {parts.name}: {parts.exercises}
        </p>
      </div>
    );
  };

  const Content = (props) => {
    const {parts} = props;
    return (
      <div>
        {parts.map(part=> <Part key={part.id} parts={part} />) /* we map through the parts array and then return a Part component for each part inside the parts array */} 
      </div>
    );
  };

  const Total = (props) => {
    const {parts} = props 
    let total = parts.reduce((sum, part)=>sum+part.exercises,0)
    return (
      <div>
        <p><strong>Numer of exercises: {total}</strong></p>
      </div>
    );
  };

const Course = (props) => {
    //console.log(props)
    const {courses} = props
    return (
      <div>
        <Header course={courses.name} />
        <Content parts={courses.parts} />
        <Total parts={courses.parts} />
      </div>
    )
  } 

  export default Course