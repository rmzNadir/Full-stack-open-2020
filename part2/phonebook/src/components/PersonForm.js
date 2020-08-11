import React from "react";

const PersonForm = (props) => {
    const {handleSubmit, newName, newPhone, handleNameInput, handlePhoneInput} = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input value={newName} onChange={handleNameInput} />
        &nbsp; Number: <input value={newPhone} onChange={handlePhoneInput} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
