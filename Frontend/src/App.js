import "./App.css";
import React, { useState, useEffect } from "react";
import { WEATHER_API_KEY } from "./keys/keys";

function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [weather, setWeather] = useState({});
  const [input, setInput] = useState("");
  const [term, setTerm] = useState("");

  function getCoordinates() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        console.log(position);
      });
    } else {
      alert("please allow browser to see your location or search a location");
    }
  }

  useEffect(() => {
    getCoordinates();
  });

  // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

  useEffect(() => {
    console.log(term);
    if (term === "") {
      if (latitude != null && longitude != null) {
        async function getWeather() {
          await fetch(
            `https:api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`
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
    } else {
      async function getWeather() {
        await fetch(
          `https:api.openweathermap.org/data/2.5/weather?q=${term}&units=metric&appid=${WEATHER_API_KEY}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setWeather(data);
          });
      }
      getWeather();
    }
  }, [latitude, longitude, term]);

  // const [{}, dispatch] = useStateValue();
  // const [input, setInput] = useState("");

  const search = (e) => {
    e.preventDefault();
    console.log("fired====>");
    setTerm(input);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Wonderous Weather</h1>
      </div>
      <div className="header_choice">
        <div className="search">
          <form>
            <div className="search__input">
              <input value={input} onChange={(e) => setInput(e.target.value)} />
            </div>
            <button onClick={search} type="submit">
              Search
            </button>
          </form>
        </div>
      </div>

      {weather.main !== undefined ? (
        <div className="weather_box">
          <div className="location">{weather.name}</div>
          <div className="temperature">{Math.round(weather.main?.temp)}°C</div>
          <div className="weather"> {weather.weather[0]?.main}</div>
          <div className="weather_icon">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
