import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Weather from "./pages/weather/Weather";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
