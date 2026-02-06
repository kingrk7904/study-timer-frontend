import React, { useState /*, useEffect */ } from "react";
import "./App.css";

function App() {
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");
  const [sessions, setSessions] = useState([]);

  // ❌ BACKEND CALL – COMMENTED FOR NOW
  

  const addSession = () => {
    if (subject === "" || duration === "") {
      alert("Please enter subject and duration");
      return;
    }

    const newSession = {
      id: Date.now(),
      subject: subject,
      duration: duration,
    };

    setSessions([...sessions, newSession]);
    setSubject("");
    setDuration("");
  };

  return (
    <div className="App">
      <h2>📘 Study Timer</h2>

      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <input
        type="number"
        placeholder="Duration (minutes)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      <br />
      <button onClick={addSession}>Add Session</button>

      <h3>Study Records</h3>
      <ul>
        {sessions.map((s) => (
          <li key={s.id}>
            {s.subject} - {s.duration} min
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
