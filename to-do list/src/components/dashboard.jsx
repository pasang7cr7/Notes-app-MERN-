import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteForm from "./noteForm";
import NoteList from "./noteList";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
            <span>NotesApp</span>
          </div>
        </div>
        <button onClick={handleLogout} className="btn-logout">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16,17 21,12 16,7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
      </header>

      <main className="dashboard-main">
        <NoteForm notes={notes} setNotes={setNotes} />
        <NoteList notes={notes} setNotes={setNotes} />
      </main>
    </div>
  );
}

export default Dashboard;
