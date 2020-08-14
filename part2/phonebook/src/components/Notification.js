import React from 'react'

const Notification = (props) => {
    const {content, type} = props.message
    if (content===null){
      return null
    }
    return (
      <div className={type}>
        {content}
      </div>
    )
}

export default Notification
