# ☁️ Weather App

A simple and modern weather application built with **React.js** and **TypeScript**, integrating with the OpenWeatherMap API to provide real-time weather updates.

## 🛠️ Features
- ✨ **Search for any city** and get live weather updates
- ☀️ **Displays current temperature** in Celsius
- ⛅️ **Weather conditions with icons**
- 📅 **Last updated time for accuracy**
- ⬆️ **Data caching** to reduce API requests
- 🎨 **Minimalist and responsive UI** with Mantine
- ⏳ **Debounced search input** to minimize unnecessary API requests
- ⌨️ **Weather data fetches on pressing Enter** for better user interaction

## 📖 Tech Stack
- ⚛️ **React.js (TypeScript)**
- 📂 **Axios** for API calls
- 🌟 **Mantine** for UI components
- ⚡ **Jest & React Testing Library** for testing

## 🛠️ Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/AnKub/weather-app.git
   cd weather-app
Install dependencies:

sh
npm install
Get an API key from OpenWeatherMap and add it to .env:

env
REACT_APP_WEATHER_API_KEY=your_api_key_here
Start the development server:

sh
npm start
🔎 Usage
Enter a city name in the search bar

Click the "Get Weather" button or press Enter to fetch the weather

View real-time weather details

Cached data will be stored for 5 minutes to optimize API requests and reduce unnecessary load

🎨 UI Preview


🔧 Testing
Run unit tests to ensure the application functions correctly:

sh
npm test
🛡️ Error Handling
If a city is not found, an error message will be displayed.

If the API request fails, a fallback message will notify the user.

💪 Contributing
Contributions are welcome! Feel free to fork the repo and submit a pull request.

✨ License
This project is licensed under the MIT License.

