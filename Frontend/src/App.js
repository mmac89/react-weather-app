import "./App.css";
import React, { useState, useEffect } from "react";
import { WEATHER_API_KEY } from "./keys/keys";
import Search from "./components/Search";

function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [weather, setWeather] = useState({});
  const [term, setTerm] = useState("");

  function getCoordinates() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        console.log(position);
      });
    } else {
      alert("please allow browser to see your location");
    }
  }

  useEffect(() => {
    getCoordinates();
  });

  // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

  useEffect(() => {
    if (latitude != null && longitude != null) {
      async function getWeather() {
        await fetch(
          `https:api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setWeather(data);
          });
      }
      getWeather();
    } else {
      return;
    }
  }, [latitude, longitude]);

  return (
    <div className="App">
      <div className="header">
        <h1>Wonderous Weather</h1>
      </div>
      <div className="header_choice">
        <div className="headerChoice__location">
          <button>Use my location</button>
        </div>
        <div className="headerChoice_search">
          <Search />
        </div>
      </div>

      {weather.current !== undefined ? (
        <div className="weather_box">
          <div className="temperature">
            {Math.round(weather.current.temp)}°C
          </div>
          <div className="weather"> {weather.current.weather[0].main}</div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
