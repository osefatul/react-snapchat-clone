import React, { useEffect } from "react";
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
import ChatView from "./components/ChatView";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
import Login from "./components/Login";
import { auth } from "./firebase";
import { PriorityHighOutlined } from "@material-ui/icons";
import mobileFrame from "./mobileFrame.png";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  //when refresh the page, it should be consistent, and the user who was logged in will stay login to the app.
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      <header className="App-header">
        <Router>
          {!user ? (
            <Login />
          ) : (
            <>
              <img
                className="app_logo"
                src="https://variety.com/wp-content/uploads/2015/01/snapchat-logo.jpg?w=1000"
                alt=""
              />
              <div className="app_body">
                <div className="body_background">
                  <Switch>
                    <Route path="/chats/view">
                      <ChatView />
                    </Route>

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
              </div>
            </>
          )}
        </Router>
      </header>
    </div>
  );
}

export default App;
