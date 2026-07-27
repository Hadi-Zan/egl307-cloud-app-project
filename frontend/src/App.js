import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

let visitRecorded = false;

function App() {
  const [visits, setVisits] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (visitRecorded) {
      return;
    }

    visitRecorded = true;

    const recordVisit = async (attempt = 1) => {
      try {
        const response = await fetch("http://localhost:5000/api/visits");

        if (!response.ok) {
          throw new Error("Backend returned an error");
        }

        const data = await response.json();
        setVisits(data.visits);
        setError("");
      } catch (err) {
        if (attempt < 5) {
          setTimeout(() => recordVisit(attempt + 1), 2000);
        } else {
          setError("Unable to connect to the visit counter.");
        }
      }
    };

    recordVisit();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="React logo" />

        <h1>EGL307 Cloud Application Project</h1>

        {visits !== null && (
          <p>
            Total visits: <strong>{visits}</strong>
          </p>
        )}

        {error && <p>{error}</p>}

        <p>React + Node.js + Redis + Docker Compose</p>
      </header>
    </div>
  );
}

export default App;