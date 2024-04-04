import React, { useState, useEffect } from "react";
import "./styles.css";

function CountrySearch() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
    } catch (error) {
      console.error("Failed to fetch countries:", error);
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm)
    );
    setFilteredCountries(filtered);
  };

  return (
    <div className="container">
      <h1>Country Search</h1>
      <input
        type="text"
        placeholder="Search country..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="country-grid">
        {filteredCountries.map((country) => (
          <div key={country.name.common} className="countryCard">
            <img src={country.flags.png} alt={country.name.common} />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountrySearch;
