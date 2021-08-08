import React from "react";
import WebcamCapture from "./components/WebcamCapture";
import Preview from "./components/Preview";
import "./App.css";
import Chats from "./components/Chats";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

function App() {
  return (
    <div className="app">
      <header className="App-header">
        <Router>
          <div className="app_body">
            <Switch>
              <Route path="/chats">
                <Chats />
              </Route>
              <Route path="/preview">
                <Preview />
              </Route>
              <Route exact path="/">
                <WebcamCapture />
              </Route>
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
