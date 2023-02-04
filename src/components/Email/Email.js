import React, { useState, useRef } from "react";
import "./Button.css";
import { validateName } from "./EmailValidation";

function EditEmail() {
  const [email, setName] = useState("js@getnada.com");
  const [isEditing, setIsEditing] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [newEmail, setNewEmail] = useState(email);
  const editBtnRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(true);
    setStatusMessage("");
  };

  const handleSave = () => {
    const isValid = validateName(newEmail);
    setIsValid(isValid);
    if (isValid) {
      setName(newEmail);
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
        <>
          <dd>
            <input
              type="text"
              id="email"
              name="email"
              aria-labelledby="keyEmail"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              aria-invalid={!isValid}
              aria-errormessage={isValid ? "" : "email-error"}
            />
            {!isValid && (
              <p id="email-error" className="error-message">
                Error! Invalid email entered.
              </p>
            )}
            <div>
              <button className="btn--save" onClick={handleSave}>
                Save
              </button>
            </div>
          </dd>
        </>
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
