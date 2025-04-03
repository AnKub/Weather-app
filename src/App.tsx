import React from "react";
import { MantineProvider, createTheme } from "@mantine/core";
import WeatherApp from "./Components/WeatherApp";

const theme = createTheme({}); 

function App() {
  return (
    <MantineProvider theme={theme}>
      <WeatherApp />
    </MantineProvider>
  );
}

export default App;