import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => {
  const { text, handleClick } = props;
  return <button onClick={handleClick}>{text}</button>;
};

const Vote = (props) =>{
  const {text, handleClick} = props;
return <button onClick={handleClick}>{text}</button>
}

const App = (props) => {
  const {anecdotes} = props
  const [selected, setSelected] = useState(0);
  const [votes,setVotes] = useState(new Uint8Array(anecdotes.length)); //set initial state for votes as an array full of zeros with the length of anecdotes
  const [max,setMax] = useState()

  const handleVote = () => {
    //console.log(votes)
    const copy = [...votes] //a copy of the votes array gets created
    copy[selected]+=1 //the selected anecdote vote count gets updated
    setVotes(copy)//we set the updated array as the new state
    setMax(copy.indexOf(Math.max(...copy)))//finds and sets the max state to the index of the highest voted anecdote
    //console.log(max)
  }

  const handleNext = () => {
    let random = Math.floor(Math.random() * anecdotes.length);
    //console.log(random)
    setSelected(random);
  };


  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      <p>Votes: {votes[selected]}</p>
      <Vote handleClick={handleVote} text="Vote"/>
      &nbsp;
      <Button handleClick={handleNext} text="Next" />
      <h2>Anecdote with most votes</h2>
      {max === undefined ? 
        <p>No most voted yet!</p> 
      : <div>
          {anecdotes[max]}
          <br/>
          <br/>
          Votes: {votes[max]}
        </div> }
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
