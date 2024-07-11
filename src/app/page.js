"use client"

import { useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [numberId, setNumberId] = useState("");
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setError(null);

    try {
      const response = await fetch(`/api/numbers/${numberId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Average Calculator Microservice</h1>
      <input
        type="text"
        value={numberId}
        onChange={(e) => setNumberId(e.target.value)}
        placeholder="Enter number ID (p, f, e, r)"
      />
      <button onClick={fetchData}>Fetch Numbers</button>

      {error && <p>Error: {error}</p>}

      {data && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
