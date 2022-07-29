import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/header";
import CreateLink from "./pages/create-link";
import Dashboard from "./pages/dashboard";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { createContext, useEffect, useMemo, useState } from "react";
import PrivateRoute from "./components/private-route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

if (localStorage.getItem("token")) {
  const decoded = jwt_decode(localStorage.getItem("token"));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    localStorage.clear();
    window.location.href = "/";
  } else {
    setAuthToken(localStorage.getItem("token"));
  }
}

export const AuthContext = createContext({
  loggedIn: false,
  setLoggedIn: () => {},
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [usernameLoggedIn, setUsernameLoggedIn] = useState("");

  const value = useMemo(
    () => ({ loggedIn, setLoggedIn, usernameLoggedIn, setUsernameLoggedIn }),
    [loggedIn, usernameLoggedIn]
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const decoded = jwt_decode(localStorage.getItem("token"));
      const currentTime = Date.now() / 1000;
      setUsernameLoggedIn(decoded?.username ?? "");
      setLoggedIn(decoded.exp > currentTime);
    }
  }, []);

  return (
    <AuthContext.Provider value={value}>
      <ToastContainer />
      <div className="container-fluid px-0">
        <Router>
          <Header />
          <div className="mt-5">
            <div className="container">
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/create-link"
                  component={CreateLink}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
