import React from "react";
import { MantineProvider, createTheme } from "@mantine/core";
import WeatherApp from "./Components/WeatherApp";

const theme = createTheme({}); // Если хочешь кастомизировать тему, добавь сюда настройки

function App() {
  return (
    <MantineProvider theme={theme}>
      <WeatherApp />
    </MantineProvider>
  );
}

export default App;