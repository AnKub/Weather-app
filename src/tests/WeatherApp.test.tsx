import { render, screen, fireEvent } from "@testing-library/react";
import WeatherApp from "../Components/WeatherApp";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("Отображение ошибки при вводе неверного города", async () => {
  mockedAxios.get.mockRejectedValue(new Error("City not found"));
  
  render(<WeatherApp />);
  
  fireEvent.change(screen.getByPlaceholderText("Enter city"), { target: { value: "WrongCity" } });
  fireEvent.click(screen.getByText("Get Weather"));
  
  expect(await screen.findByText("City not found or API error.")).toBeInTheDocument();
});
