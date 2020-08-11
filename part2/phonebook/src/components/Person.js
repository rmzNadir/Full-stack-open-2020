import React from 'react'

const Person = (props) => {
    const {name,phone} = props.person
    //console.log(props.person)
    return (
        <div>
            {name} --- Phone: {phone}
        </div>
    )
}

export default Person
