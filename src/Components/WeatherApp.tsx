import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextInput, Button, Card, Text, Image } from "@mantine/core";

const API_KEY = "ВАШ_API_КЛЮЧ"; // Замените на ваш ключ
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const cachedWeather = localStorage.getItem("weather");
    if (cachedWeather) {
      setWeather(JSON.parse(cachedWeather));
    }
  }, []);

  const fetchWeather = async () => {
    try {
      setError("");
      const response = await axios.get(API_URL, {
        params: { q: city, appid: API_KEY, units: "metric" },
      });

      setWeather(response.data);
      localStorage.setItem("weather", JSON.stringify(response.data));
      localStorage.setItem("lastFetch", Date.now().toString());
    } catch (err) {
      setError("City not found or API error.");
    }
  };

  return (
    <Container>
      <TextInput value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" />
      <Button onClick={fetchWeather}>Get Weather</Button>

      {error && <Text color="red">{error}</Text>}
      {weather && (
        <Card>
          <Text>{weather.name}</Text>
          <Text>{weather.main.temp}°C</Text>
          <Text>{weather.weather[0].description}</Text>
          <Image src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="weather icon" />
        </Card>
      )}
    </Container>
  );
};

export default WeatherApp;
