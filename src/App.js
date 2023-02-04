import React from "react";
import StaticContent from "./components/StaticContent/StaticContent";
import Email from "./components/Email/Email";
import Name from "./components/Name/Name";
import "./components/Styles/styles.css";

function App() {
  return (
    <dl>
      <StaticContent />
      <Email />
      <Name />
    </dl>
  );
}

export default App;
