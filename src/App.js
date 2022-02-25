import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from './components/Login';
import TeamAnalysis from "./components/TeamAnalysis";
import Matchups from "./components/Matchups";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import "./App.css";

class App extends Component {
  state = {
    loading: false,
    error: null
  };

  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <Header />
          </header>
          <div className="mainBody">
            <Switch>
              <Route path="/user">
                <h2>user</h2>
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/about">
                <h2>about</h2>
              </Route>
              <Route path="/team-analysis">
                <TeamAnalysis />
              </Route>
              <Route path="/matchups">
                <Matchups />
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </div>
          <footer>
            <Footer />
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
