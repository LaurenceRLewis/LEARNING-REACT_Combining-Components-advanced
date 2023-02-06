import React, { useState, useEffect, useRef } from "react";
import "./Button.css";
import { validateName } from "./NameValidation";

function EditName() {
  const [name, setName] = useState("Given name");
  const [isEditing, setIsEditing] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [nameInputCount, setNameInputCount] = useState(0);
  const editBtnRef = useRef(null);
  const inputRef = useRef(null);

  const handleEdit = () => {
    if (!isEditing) {
      setIsEditing(true);
      setStatusMessage("");
      setTimeout(() => {
        inputRef.current.focus();
      }, 0);
    } else {
      const newName = inputRef.current.value;
      const isValid = validateName(newName);
      setIsValid(isValid);
      if (isValid) {
        setName(newName);
        setIsEditing(false);
        setStatusMessage("Please enter a valid name");
        setTimeout(() => {
          editBtnRef.current.focus();
        }, 0);
        setNameInputCount(0);
      } else {
        setNameInputCount(nameInputCount + 1);
      }
    }
  };

  useEffect(() => {
    if (!isValid && nameInputCount >= 1) {
      inputRef.current.focus();
    }
  }, [isValid, nameInputCount]);

  return (
    <>
      <dt id="keyName">Name:</dt>
      {isEditing ? (
        <dd>
          <input
            type="text"
            id="nameID"
            name="name"
            aria-labelledby="keyName"
            defaultValue={name}
            ref={inputRef}
            aria-invalid={!isValid}
            aria-errormessage={isValid ? "" : "name-error"}
          />
          {!isValid && (
            <p id="name-error" className="error-message">
              Error! Please enter a valid name.
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
            <button
              id="NameSuccess"
              className="btn--edit"
              onClick={handleEdit}
              ref={editBtnRef}
            >
              Edit name
            </button>
          </div>
          <div id="NameSuccess" aria-live="polite">
            {statusMessage && <p className="status-message">{statusMessage}</p>}
          </div>
        </dd>
      )}
    </>
  );
}

export default EditName;
