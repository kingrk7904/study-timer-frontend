import React, { useEffect, useState } from "react";
import "./App.css";
import {
  createSession,
  deleteSession,
  getAllSessions,
  getSessionById,
  updateSession,
} from "./services/api";

function App() {
  const [sessions, setSessions] = useState([]);
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const loadSessions = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllSessions();
      setSessions(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Unable to load sessions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const resetForm = () => {
    setSubject("");
    setDuration("");
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const parsedDuration = Number(duration);
    if (!subject.trim() || !duration || Number.isNaN(parsedDuration) || parsedDuration <= 0) {
      setError("Please enter both subject and duration.");
      return;
    }

    const payload = {
      subject: subject.trim(),
      duration: parsedDuration,
    };

    setSubmitting(true);
    setError("");
    setStatus("");
    try {
      if (editingId) {
        await updateSession(editingId, payload);
        setStatus("Session updated successfully.");
      } else {
        await createSession(payload);
        setStatus("Session created successfully.");
      }
      await loadSessions();
      resetForm();
    } catch (err) {
      setError(err.message || "Unable to save session. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (id) => {
    setSubmitting(true);
    setError("");
    setStatus("");
    try {
      const session = await getSessionById(id);
      setSubject(session.subject || "");
      setDuration(String(session.duration || ""));
      setEditingId(id);
    } catch (err) {
      setError(err.message || "Unable to load session details.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
  const confirmed = window.confirm("Delete this session?");
  if (!confirmed) {
    return;
  }

  const password = prompt("Enter administration password:");

  if (password !== "2005") {
    alert("Enter valid password!");
    return;
  }

  setSubmitting(true);
  setError("");
  setStatus("");

  try {
    await deleteSession(id);
    await loadSessions();
    setStatus("Session deleted successfully.");

    if (editingId === id) {
      resetForm();
    }
  } catch (err) {
    setError(err.message || "Unable to delete session.");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="App">
      <h2>Study Timer</h2>
      <p className="subtitle">Track your focus sessions and keep your routine consistent.</p>

      <form className="session-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          disabled={submitting}
        />

        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
          disabled={submitting}
          min="1"
        />

        <div className="form-actions">
          <button type="submit" disabled={submitting}>
            {editingId ? "Update Session" : "Add Session"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} disabled={submitting}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {error && <p className="error">{error}</p>}
      {status && <p className="status">{status}</p>}
      {loading ? <p>Loading sessions...</p> : null}

      <h3>Study Records</h3>
      <ul className="session-list">
        {!loading && sessions.length === 0 ? <li>No sessions found.</li> : null}
        {sessions.map((session) => (
          <li key={session.id} className="session-item">
            <span>
              {session.subject} - {session.duration} min
            </span>
            <div className="item-actions">
              <button
                type="button"
                onClick={() => handleEdit(session.id)}
                disabled={submitting}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(session.id)}
                disabled={submitting}
                className="danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
