import React, { useState } from "react";

function NoteForm({ notes, setNotes }) {
  const [content, setNote] = useState("");
  const [title, setTitle] = useState("");

  const noteHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      const req = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });
      const data = await req.json();
      setNotes([...notes, data.note]);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      Enter Title:{" "}
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />{" "}
      <br />
      Enter note:{""}
      <input
        type="text"
        placeholder="Enter note"
        value={content}
        onChange={(e) => setNote(e.target.value)}
      />
      <br />
      <button
        onClick={() => {
          {
            noteHandler();
          }
          setNote("");
          setTitle("");
        }}
      >
        ~ ADD notes
      </button>
    </div>
  );
}

export default NoteForm;
