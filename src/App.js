import React, { useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');

    const apiKey = "55168936e8b2504dbc58ea048054180a";
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather`;

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            const params = {
                q: location,
                units: "imperial",
                appid: apiKey
            };
            axios.get(apiUrl, { params })
                .then((response) => {
                    setData(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching weather data:", error);
                });
            setLocation('');
        }
    };

    return (
        <div className="app">
            <div className="search">
                <input
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    onKeyPress={searchLocation}
                    placeholder="Enter Location"
                    type="text"
                />
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>{data.name}</p>
                    </div>
                    <div className="temp">
                        {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
                    </div>
                    <div className="description">
                        {data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div>
                </div>

                {data.name !== undefined &&
                    <div className="bottom">
                        <div className="feels">
                            {data.main ? <p className="bold">{data.main.feels_like.toFixed()}</p> : null}
                            <p>Feels Like</p>
                        </div>
                        <div className="humidity">
                            {data.main ? <p className='bold'>{data.main.humidity.toFixed()}%</p> : null}
                            <p>Humidity</p>
                        </div>
                        <div className="wind">
                            {data.wind ? <p className='bold'>{data.wind.speed}</p> : null}
                            <p>Wind Speed</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default App;
