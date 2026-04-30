import { json } from "express";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("token");

    fetch(" http://localhost:3000", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json)
      .then((data) => console.log(data));
  }, []);

  return (
    <div>
      <h1>Notes App</h1>
    </div>
  );
}

export default App;

// const [name, setName] = useState("Pasang");

// return (
//   <div>
//     <h1>Hello {name} </h1>
//     <button onClick={() => setName("MERN developer")}>Click me</button>
//   </div>
// );

/*
  const [grade, setgrade] = useState(15);
  return (
    <div>
      
      <h2>you are in {grade} class</h2>

      <button onClick={() => setgrade(16)}>yeta click gar</button>
    </div>
    */
