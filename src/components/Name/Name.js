import React, { useState, useEffect, useRef } from "react";
//import "../../../src/styles.css";
import "./Button.css";
import { validateName } from "./NameValidation";

function EditName() {
  const [name, setName] = useState("John Stone");
  const [isEditing, setIsEditing] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const editBtnRef = useRef(null);
  const inputRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setStatusMessage("");
    if (isEditing) {
      const newName = inputRef.current.value;
      const isValid = validateName(newName);
      setIsValid(isValid);
      if (isValid) {
        setName(newName);
        setStatusMessage("Your name is successfully updated.");
        setTimeout(() => {
          editBtnRef.current.focus();
        }, 0);
      }
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <>
      <dt id="keyName">Name:</dt>
      {isEditing ? (
        <dd>
          <input
            type="text"
            id="name"
            name="name"
            aria-labelledby="keyName"
            defaultValue={name}
            ref={inputRef}
            aria-invalid={!isValid}
            aria-errormessage={isValid ? "" : "name-error"}
          />
          {!isValid && (
            <p id="name-error" className="error-message">
              Error! Invalid character entered. Please enter a valid name using
              letters A—z, hyphens and spaces.
            </p>
          )}
          <div>
            <button className="btn--save" onClick={handleEdit}>
              Save
            </button>
          </div>
        </dd>
      ) : (
        <dd>
          {name}
          <div>
            <button className="btn--edit" onClick={handleEdit} ref={editBtnRef}>
              Edit name
            </button>
          </div>
          <div role="status">
            {statusMessage && <p className="status-message">{statusMessage}</p>}
          </div>
        </dd>
      )}
    </>
  );
}

export default EditName;
