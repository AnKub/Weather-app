import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextInput, Button, Card, Text, Image } from "@mantine/core";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

// Трохи інтерфейсу, щоб тапскрипт не матюкався
interface WeatherResponse {
  name: string;
  main: {
    temp: number;
  };
  weather: { description: string; icon: string }[];
}

interface GeoResponse {
  lat: number;
  lon: number;
  name: string;
}

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const cachedWeather = localStorage.getItem("weather");
    const lastFetch = localStorage.getItem("lastFetch");

    if (cachedWeather && lastFetch) {
      const elapsedTime = Date.now() - parseInt(lastFetch);
      if (elapsedTime < 10 * 60 * 1000) {
        setWeather(JSON.parse(cachedWeather));
      }
    }
  }, []);

  const fetchWeather = async () => {
    if (!API_KEY) {
      setError("API key is missing. Please check your .env file.");
      return;
    }

    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    try {
      setError("");

      // тут я використовую координати щоб не плуався пошук
      const geoResponse = await axios.get<GeoResponse[]>("https://api.openweathermap.org/geo/1.0/direct", {
        params: { q: city, limit: 1, appid: API_KEY },
      });

      if (geoResponse.data.length === 0) {
        throw new Error("City not found.");
      }

      const { lat, lon } = geoResponse.data[0];  

      //отримання погодних умов за геолокацією))
      const weatherResponse = await axios.get<WeatherResponse>("https://api.openweathermap.org/data/2.5/weather", {
        params: { lat, lon, appid: API_KEY, units: "metric" },
      });

      setWeather(weatherResponse.data);
      localStorage.setItem("weather", JSON.stringify(weatherResponse.data));
      localStorage.setItem("lastFetch", Date.now().toString());
    } catch (err) {
      setError("City not found or API error.");
    }
  };

  return (
    <Container>
      <TextInput
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <Button onClick={fetchWeather}>Get Weather</Button>

      {error && <Text color="red">{error}</Text>}

      {weather && (
        <Card>
          <Text>{weather.name}</Text>
          <Text>{weather.main.temp}°C</Text>
          <Text>{weather.weather[0].description}</Text>
          <Image
            src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt="weather icon"
          />
        </Card>
      )}
    </Container>
  );
};

export default WeatherApp;
