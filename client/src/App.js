import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";

import "./styles/main.scss";

const App = () => (
  <Router>
    <div className="waves"></div>
    <Route path="/" exact component={Join} />
    <Route path="/chat" component={Chat} />
  </Router>
);

export default App;
