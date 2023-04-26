import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const App = () => {
  const [country, setCountry] = useState([]);
  const [filterCountry, setFilterCountry] = useState("");
  const [newCountry, setNewCountry] = useState({});

  const hook = () => {
    console.log("Effect");
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      console.log("Promise fulfilled");
      setCountry(res.data);
    });
  };
  useEffect(hook, []);

  useEffect(() => {
    console.log("render", country.length, "countries");
    console.log("first", country);
   
      

    const filteredCountry = country.filter(
      (country) => country.name.common.toLowerCase() === filterCountry
    );
    console.log('filteredCountry', filteredCountry)
    if (filteredCountry.length > 0) {
      setNewCountry(filteredCountry[0]);
    } else {
      setNewCountry({});
    }

    console.log(filteredCountry)
  }, [country, filterCountry]);

  const handleCountryChange = (event) => {
    console.log(event.target.value);
    setFilterCountry(event.target.value.trim());  
  };

  console.log(country);

  return (
    <div>
      <form>
        <p>Searching Countries</p>
        <input value={filterCountry} onChange={handleCountryChange} />
      </form>
      <div>
        <h2>{newCountry.name?.common}</h2>
        <p>{newCountry.capital?.[0]}</p>
        <p>{newCountry.region}</p>
        {/* <img>{newCountry.flags?.png}</img> */}
        
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);