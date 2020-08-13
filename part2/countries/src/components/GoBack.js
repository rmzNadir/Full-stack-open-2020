import React from 'react'

const GoBack = (props) => {
    const {handleBack} = props
        return (
            <button onClick={handleBack}>Go back</button>
        )
}

export default GoBack
