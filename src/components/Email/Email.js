import React, { useState, useEffect, useRef } from "react";
import "./Button.css";
import { validateEmail } from "./EmailValidation";

function EditEmail() {
  const [email, setEmail] = useState("myemail@getnada.com");
  const [isEditing, setIsEditing] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [emailInputCount, setEmailInputCount] = useState(0);
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
      const newEmail = inputRef.current.value;
      const isValid = validateEmail(newEmail);
      setIsValid(isValid);
      if (isValid) {
        setEmail(newEmail);
        setIsEditing(false);
        setStatusMessage("Your Email is successfully updated.");
        setTimeout(() => {
          editBtnRef.current.focus();
        }, 0);
        setEmailInputCount(0);
      } else {
        setEmailInputCount(emailInputCount + 1);
      }
    }
  };

  useEffect(() => {
    if (!isValid && emailInputCount >= 1) {
      inputRef.current.focus();
    }
  }, [isValid, emailInputCount]);

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
            <button
              aria-describedby="EmailSuccess"
              className="btn--edit"
              onClick={handleEdit}
              ref={editBtnRef}
            >
              Edit email
            </button>
          </div>
          <div id="EmailSuccess" aria-live="polite">
            {statusMessage && <p className="status-message">{statusMessage}</p>}
          </div>
        </dd>
      )}
    </>
  );
}

export default EditEmail;
