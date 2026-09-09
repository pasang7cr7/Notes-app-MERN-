import { useState } from "react";

function NoteForm({ notes, setNotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const noteHandler = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const req = await fetch(
        "https://notes-app-mern-x3rp.onrender.com/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, content }),
        }
      );
      const data = await req.json();
      setNotes([...notes, data.note]);
      setTitle("");
      setContent("");
      setIsExpanded(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={`note-form-card ${isExpanded ? "expanded" : ""}`}>
      <div className="note-form-header">
        <div className="note-form-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </div>
        <input
          type="text"
          className="note-form-title-input"
          placeholder="Take a note..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setIsExpanded(true)}
        />
      </div>

      {isExpanded && (
        <div className="note-form-body">
          <textarea
            className="note-form-content-input"
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
          />
          <div className="note-form-actions">
            <button
              className="btn-cancel"
              onClick={() => {
                setIsExpanded(false);
                setTitle("");
                setContent("");
              }}
            >
              Cancel
            </button>
            <button className="btn-add" onClick={noteHandler}>
              Add Note
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteForm;
