import { useState, useEffect } from "react";

function NoteList({ notes = [], setNotes }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://notes-app-mern-x3rp.onrender.com/notes", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setNotes(data.note || []);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchNotes();
  }, [setNotes]);

  const handleDelete = async (noteId) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`https://notes-app-mern-x3rp.onrender.com/notes/${noteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((n) => n._id !== noteId));
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSave = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://notes-app-mern-x3rp.onrender.com/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });

      if (res.ok) {
        setNotes(
          notes.map((n) =>
            n._id === id ? { ...n, title: editTitle, content: editContent } : n
          )
        );
        setEditingId(null);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  if (notes.length === 0) {
    return (
      <div className="notes-empty">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
        <h3>No notes yet</h3>
        <p>Create your first note to get started!</p>
      </div>
    );
  }

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <div key={note._id} className="note-card">
          {editingId === note._id ? (
            <div className="note-edit-mode">
              <input
                type="text"
                className="note-edit-title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                className="note-edit-content"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={4}
              />
              <div className="note-edit-actions">
                <button className="btn-save" onClick={() => handleSave(note._id)}>
                  Save
                </button>
                <button className="btn-cancel" onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="note-card-header">
                <h3 className="note-title">{note.title}</h3>
                <div className="note-actions">
                  <button
                    className="btn-icon"
                    onClick={() => {
                      setEditingId(note._id);
                      setEditTitle(note.title);
                      setEditContent(note.content);
                    }}
                    title="Edit"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button
                    className="btn-icon btn-delete"
                    onClick={() => handleDelete(note._id)}
                    title="Delete"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3,6 5,6 21,6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      <line x1="10" y1="11" x2="10" y2="17"/>
                      <line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                  </button>
                </div>
              </div>
              <p className="note-content">{note.content}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default NoteList;
