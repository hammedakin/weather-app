import './App.css';
import React, { useState } from 'react';



const api = {
  key: '58c46ab690337ca635d59e86fc52ee48',
  base: 'https://api.openweathermap.org/data/2.5/'
};

function App() {

  const [query, setquery] = useState('');
  const [weather, setweather] = useState('');

  const search = (e) => {
    if (e.key === 'Enter') {
      fetch(`${ api.base }weather?q=${ query }&units=metric&APPID=${ api.key }`)
        .then(res => res.json())
        .then(res => {
          if (res.cod === 200) {
            setweather(res);
            setquery('');
            console.log(res);
          } else {
            setweather(res);

          }
        });

    } else {

    }
  };


  const dateBuilder = () => {
    let d = new Date();
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${ day }, ${ date } ${ month } ${ year }`;
  };
  return (
    <>
      <div className={weather.main ? (weather.main.temp > 16 ? 'app warm' : 'app') : 'app'}>
        <main>
          <div className="search-box">
            <input type="text"
              className="search-bar"
              placeholder="search..."
              onChange={e => setquery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {(weather.main) ?
            <>
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">
                  {dateBuilder()}
                </div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weather.main.temp)}°c
                </div>
                <div className="weather">
                  {weather.weather[0].main}
                </div>
              </div>
            </>
            : <>
              <div className="">
                <div className="none">
                  Hi, Input a Country, State or City
                </div>
                {weather.message ?
                  <div className="none">
                    {weather.message}
                  </div>
                  : ('')}
              </div>
            </>}
        </main>
      </div>
    </>
  );
}

export default App;
