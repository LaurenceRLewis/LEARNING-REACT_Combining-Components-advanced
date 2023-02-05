import React, { useState, useEffect, useRef } from "react";
import "./Button.css";
import { validateEmail } from "./EmailValidation";

function EditEmail() {
  const [email, setEmail] = useState("myemail@getnada.com");
  const [isEditing, setIsEditing] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const editBtnRef = useRef(null);
  const inputRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setStatusMessage("");
    if (isEditing) {
      const newEmail = inputRef.current.value;
      const isValid = validateEmail(newEmail);
      setIsValid(isValid);
      if (isValid) {
        setEmail(newEmail);
        setStatusMessage("Your Email is successfully updated.");
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
      <dt id="keyEmail">Email:</dt>
      {isEditing ? (
        <dd>
          <input
            type="text"
            id="emailID"
            name="name"
            aria-labelledby="keyEmail"
            defaultValue={email}
            ref={inputRef}
            aria-invalid={!isValid}
            aria-errormessage={isValid ? "" : "email-error"}
          />
          {!isValid && (
            <p id="email-error" className="error-message">
              Error! Please enter a valid email address.
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
          {email}
          <div>
            <button className="btn--edit" onClick={handleEdit} ref={editBtnRef}>
              Edit email
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

export default EditEmail;
