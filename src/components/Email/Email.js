import React, { useState, useEffect, useRef } from "react";
import "./Email.css";
import "./Button.css";
import { validateName } from "./EmailValidation";

function DescriptionList() {
  const [email, setName] = useState("js@getnada.com");
  const [isEditing, setIsEditing] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const editBtnRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(true);
    setStatusMessage("");
  };

  useEffect(() => {
    if (isEditing) {
      const form = document.querySelector("form");
      const input = form.querySelector("input");
      input.focus();
    }
  }, [isEditing]);

  const handleSave = (event) => {
    event.preventDefault();
    const newName = event.target.email.value;
    const isValid = validateName(newName);
    setIsValid(isValid);
    if (isValid) {
      setName(newName);
      setIsEditing(false);
      setStatusMessage("Your email is successfully updated.");
      setTimeout(() => {
        editBtnRef.current.focus();
      }, 0);
    }
  };

  return (
    <>
      <dt id="keyEmail">Email:</dt>
      {isEditing ? (
        <form onSubmit={handleSave}>
          <dd>
            <input
              type="text"
              id="email"
              email="email"
              aria-labelledby="keyEmail"
              defaultValue={email}
              aria-invalid={!isValid}
              aria-errormessage={isValid ? "" : "email-error"}
            />
            {!isValid && (
              <p id="email-error" className="error-message">
                Error! Invalid email entered.
              </p>
            )}
            <div>
              <button className="btn--save" type="submit">
                Save
              </button>
            </div>
          </dd>
        </form>
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

export default DescriptionList;
