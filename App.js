import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AskQa from "./components/ask-qa.component";
import AnswerQa from "./components/answer-qa.component";
import QaList from "./components/qa-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">MERN-Stack QA App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Q + A's</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/ask" className="nav-link">Ask a Question</Link>
                </li>
              </ul>
            </div>

          </nav>
          <br/>
          <Route path="/" exact component={QaList} />
          <Route path="/answer/:id" component={AnswerQa} />
          <Route path="/ask" component={AskQa} />
        </div>
      </Router>
    );
  }
}

export default App;