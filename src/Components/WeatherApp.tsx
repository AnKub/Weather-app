import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextInput, Button, Card, Text, Image } from "@mantine/core";
import styles from "./WeatherApp.module.scss";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

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

      const geoResponse = await axios.get<GeoResponse[]>("https://api.openweathermap.org/geo/1.0/direct", {
        params: { q: city, limit: 1, appid: API_KEY },
      });

      if (geoResponse.data.length === 0) {
        throw new Error("City not found.");
      }

      const { lat, lon } = geoResponse.data[0];

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
    <Container className={styles.container}>
      <div className={styles.inputContainer}>
        <TextInput
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className={styles.input} 
        />
        <Button onClick={fetchWeather} className={styles.button}>Get Weather</Button>
      </div>
  
      {error && <Text className={styles.error}>{error}</Text>}
  
      {weather && (
        <Card className={styles.card}>   
          <Text className={styles.cityName}>{weather.name}</Text>
  
          <div className={styles.weatherDetails}>
            <div className={styles.leftSide}>
              <Image
                src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt="weather icon"
                className={styles.weatherIcon}
              />
              <Text className={styles.weatherDescription}>{weather.weather[0].description}</Text>
            </div>
            <div className={styles.rightSide}>
              <Text className={styles.temperature}>{weather.main.temp}°C</Text>
            </div>
          </div>
        </Card>
      )}
    </Container>
  );
  
};

export default WeatherApp;
