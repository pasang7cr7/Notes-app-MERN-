import React, { useState, useEffect } from "react";
import "./App.css";

import UserCard from "./components/card";
import NoteList from "./components/noteList";

import Login from "./components/login";
import Register from "./components/register";
import NoteForm from "./components/noteForm";

// function App() {
//   const [count, setCount] = useState(0);
//   const [name, setName] = useState("");
//   const [notes, setNotes] = useState([]);

//   useEffect(() => {
//     console.log("APP loaded");
//   }, []);

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="enter name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <p>your name is {name}</p>
//       <br /> <br />
//       <Noteform notes={notes} setNotes={setNotes} />
//       <NoteList notes={notes} setNotes={setNotes} />

//     </div>
//   );
// }

// export default App;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    console.log("APP loaded");
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <>
          <Login setIsLoggedIn={setIsLoggedIn} />
          <Register />
        </>
      ) : (
        <>
          <NoteForm notes={notes} setNotes={setNotes} />
          <NoteList notes={notes} setNotes={setNotes} />
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default App;

/* <h3>{count}</h3>
      {count > 10 && <p>Too much!</p>}
      {count === 0 && <p>Start counting!!</p>}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increase
      </button>
      <button
        onClick={() => {
          if (count > 0) setCount(count - 1);
        }}
      >
        Decrese
      </button> */

/*
        <UserCard name="Pasang" age={19} />
      <UserCard name="Ram" age={21} />
      <br />
      <br />
      */
