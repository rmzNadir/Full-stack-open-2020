import React from 'react'

const Person = (props) => {
    const {handleDelete} = props
    const {name,phone} = props.person
    //console.log(props.person)
    return (
        <div>
            Name: {name} | Phone: {phone} <button onClick={()=>handleDelete(props.person)}>Delete</button>
        </div>
    )
}

export default Person
