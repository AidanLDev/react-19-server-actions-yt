import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CreateNote from "./components/CreateNote";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Actions! In Action</h1>
        <CreateNote />
      </header>
    </div>
  );
}

export default App;
