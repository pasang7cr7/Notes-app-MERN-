import React, { useState, useEffect } from "react";

function NoteList({ notes = [], setNotes }) {
  useEffect(() => {
    try {
      const fetchNotes = async () => {
        const url = "https://notes-app-mern-x3rp.onrender.com/notes";
        const token = localStorage.getItem("token");
        const res = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setNotes(data.note);
      };
      fetchNotes();
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  const del = async (noteId) => {
    const token = localStorage.getItem("token");

    const url = `https://notes-app-mern-x3rp.onrender.com/notes/${noteId}`;
    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(notes.filter((n) => n._id !== noteId));
    } catch (err) {
      console.error(err.message);
    }
  };

  const [editingId, seteditingId] = useState(null);
  const [editTitle, seteditTitle] = useState("");
  const [editContent, seteditContent] = useState();

  const prepareedit = (id, title, content) => {
    seteditingId(id);
    seteditContent(content);
    seteditTitle(title);
  };

  const handleSave = async (id) => {
    const token = localStorage.getItem("token");
    const url = `https://notes-app-mern-x3rp.onrender.com/notes/${id}`;

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });
      if (res.ok) {
        seteditingId(null);
        setNotes(
          notes.map((n) => {
            return n._id === editingId
              ? { ...n, title: editTitle, content: editContent }
              : n;
          }),
        );
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      {notes.map((n, index) => (
        <div key={index}>
          {editingId === n._id ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => {
                  seteditTitle(e.target.value);
                }}
              />
              <br />
              <input
                type="text"
                value={editContent}
                onChange={(e) => {
                  seteditContent(e.target.value);
                }}
              />
              <button onClick={() => handleSave(n._id)}>Save</button>
              <button onClick={() => seteditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{n.title}</h3>
              <p>{n.content}</p>
              <button
                onClick={() => {
                  //setNote(notes.filter((_,i)=>i!== index));

                  {
                    del(n._id);
                  }
                }}
              >
                Delete
              </button>

              <button
                onClick={() => {
                  prepareedit(n._id, n.title, n.content);
                }}
              >
                Edit
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default NoteList;
