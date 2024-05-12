import React from "react";
import "./App.css";
import { Navbar } from "./Components/Navbar";
import { Home } from "./Pages/Home";
import { AllRoutes } from "./routes/AllRoutes";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AllRoutes/>
      {/* <Home/> */}
    </div>
  );
}

export default App;
