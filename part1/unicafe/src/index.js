import React, {useState} from 'react'
import ReactDOM from 'react-dom'

export const Button = (props) => {
  const {text,handleClick} = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

export const Statistics = (props) => {
  const {text,value} = props
  return (
    <tr>
      <td>{text}: </td>
  <td>{value}</td>
    </tr>
  )
}



export const App = () => {
  const[good,setGood] = useState(0)
  const[neutral,setNeutral] = useState(0)
  const[bad,setBad] = useState(0)

  const handleGood = () => setGood(good+1)

  const handleBad = () => setBad(bad+1)

  const handleNeutral = () => setNeutral(neutral+1)


  let total = (good+neutral+bad)
  let average = (total/3)

  const percent = () => {
    if(good===0&&neutral===0&&bad===0){
      return (`0.00%`)
    }
    return (
      `${(good*100/(total)).toFixed(2)}%`
    )
  } 
  

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button
      handleClick={handleGood}
      text='Good'
      />
       <Button
      handleClick={handleNeutral}
      text='Neutral'
      />
       <Button
      handleClick={handleBad}
      text='Bad'
      />
      <h2>Statistics</h2>
      {total>0 ? <table>
       <tbody>
        <Statistics text="Good" value={good}/>
        <Statistics text="Neutral" value={neutral}/>
        <Statistics text="Bad" value={bad}/>
        <Statistics text="Total" value={total}/>
        <Statistics text="Average" value={average}/>
        <Statistics text="Positive" value={percent()}/>
       </tbody>
      </table> :  <p>No feedback given</p> }
    </div>
  )
}



ReactDOM.render(<App/>,document.getElementById("root"));