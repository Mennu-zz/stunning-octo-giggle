import React, { useState } from "react";
import "./App.css";

const cache = new Set();

function getWordCount(url) {
  return fetch(`http://localhost:3000/api/word-count?url=${url}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

function App() {
  const [data, setDate] = useState();
  const inputRef = React.useRef();

  const handleSubmit = async (eventOrUrl) => {
    let url = inputRef.current.value;
    let result = null;
    if (typeof eventOrUrl !== "string") {
      eventOrUrl.preventDefault();
      result = await getWordCount(url);
      cache.add(url);
      inputRef.current.value = "";
    } else {
      url = eventOrUrl;
      result = await getWordCount(url);
    }
    setDate(result.data);
  };

  const history = Array.from(cache);

  return (
    <div className="App">
      <header className="App-header">
        <h1>URL Word Exractor</h1>
        <form onSubmit={handleSubmit} autoComplete="on">
          <input
            type="url"
            autoComplete="on"
            ref={inputRef}
            placeholder="URL input"
          ></input>
          <input className="btn-primary" type="submit"></input>
        </form>

        <div className="row">
          <div className="column left">
            <h2>User History</h2>
            {history.map((h) => (
              <p key={h}>
                <a onClick={() => handleSubmit(h)}>{h}</a>
              </p>
            ))}
          </div>
          <div className="column right">
            <h2>Word Count</h2>
            {data &&
              Object.keys(data).map((key) => (
                <p key={key}>
                  {key} : {data[key]}
                </p>
              ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
