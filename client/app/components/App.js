import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/theme.css";
import ".styles//main.css";

import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Home />
      <Footer />
    </div>
  );
};

export default App;
