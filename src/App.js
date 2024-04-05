import { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const getCountriesData = async () => {
    try {
      const data = await fetch("https://restcountries.com/v3.1/all");
      const res = await data.json();
      setCountries(res);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getCountriesData();
  }, []);

  return (
    <>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search for countries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="container">
        {filteredCountries.map((country) => {
          return (
            <div key={country.cca3} className="countryCard">
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                className="imageStyle"
              />
              <p className="textStyle">{country.name.common}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
