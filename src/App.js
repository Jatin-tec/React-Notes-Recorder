import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/about";
import Home from "./components/home";
import Login from "./components/login";
import Navbar from "./components/navbar";
import Signup from "./components/signup";
import NoteState from "./context/notes/noteState";
import AlertMsg from "./components/alertMsg"

function App() {
  const [message, setMessage] = useState(null)

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <AlertMsg alert={message} alertMsg={setMessage}/>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/login">
              <Login alertMsg={setMessage} />
            </Route>
            <Route exact path="/signup">
              <Signup alertMsg={setMessage} />
            </Route>
          </Switch>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
