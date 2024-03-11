// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search countries..."
      />
      <div className="countryContainer">
        {filteredCountries.map(country => (
          <div className="countryCard" key={country.cca2}>
            <img src={country.flags.png} alt={`${country.name.common} flag`} />
            <h2>{country.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
