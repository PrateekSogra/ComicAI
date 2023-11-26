import React, { useState } from 'react';
import './App.css';
import Query from './TextImage.js';

function App() {
  const [query, setQuery] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
  const [errorState, setErrorState] = useState(false);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleFetchImage = async (event) => {
    if (event) {
      event.preventDefault();
    }

    try {
      const response = await Query({ "inputs": query });
      const blobUrl = URL.createObjectURL(response);
      setImageSrc(blobUrl);
      setErrorState(false);
    } catch (error) {
      setErrorState(true);
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleFetchImage} className="row g-3">
        <input type="text" id="queryInput" value={query} onChange={handleQueryChange} placeholder="Send messages..." autoComplete="off"/>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
      {imageSrc && <img src={imageSrc}/>}
      {errorState && <div><p>Error loading image</p></div>}
    </div>
  );
}

export default App;
