import axios from "axios";

let windowPrevState = [];
let windowCurrState = [];

const fetchNumbers = async (id) => {
  const urlMap = {
    p: "http://20.244.56.144/test/primes",
    f: "http://20.244.56.144/test/fibo",
    e: "http://20.244.56.144/test/even",
    r: "http://20.244.56.144/test/rand",
  };

  const url = urlMap[id];
  if (!url) throw new Error("Invalid number ID");

  const response = await axios.get(url, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNjkyMDYyLCJpYXQiOjE3MjA2OTE3NjIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjJiNjk5NzhkLTcyYTAtNDZiZi1hNmI4LTU0YmJjODM1OTgzMyIsInN1YiI6InVtYW5nLjIxLmJlaXNAYWNoYXJ5YS5hYy5pbiJ9LCJjb21wYW55TmFtZSI6ImdvTWFydCIsImNsaWVudElEIjoiMmI2OTk3OGQtNzJhMC00NmJmLWE2YjgtNTRiYmM4MzU5ODMzIiwiY2xpZW50U2VjcmV0IjoidVV4blNPZXNrUUpreWJqWCIsIm93bmVyTmFtZSI6IlVtYW5nIFJhaiIsIm93bmVyRW1haWwiOiJ1bWFuZy4yMS5iZWlzQGFjaGFyeWEuYWMuaW4iLCJyb2xsTm8iOiIxQVkyMUlTMTI5In0.8w6dbbZYYq1WV6HVNoVDlmB38XCOoXrT2J4oeiKg2Cs",
      "Content-Type": "application/json",
    },
  });

  return response.data.numbers;
};

const calculateAverage = (numbers) => {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return (sum / numbers.length).toFixed(2);
};

export default async function handler(req, res) {
  const {
    query: { numberid },
  } = req;

  try {
    const numbers = await fetchNumbers(numberid);

    windowPrevState = [...windowCurrState];
    windowCurrState = [...new Set([...windowCurrState, ...numbers])];

    if (windowCurrState.length > 10) {
      windowCurrState = windowCurrState.slice(-10);
    }

    const avg = calculateAverage(windowCurrState);

    res.status(200).json({
      windowPrevState,
      windowCurrState,
      numbers,
      avg: parseFloat(avg),
    });
  } catch (error) {
    console.error(`Error processing request: ${error.message}`);
    res.status(500).json({ error: "Server error" });
  }
}
