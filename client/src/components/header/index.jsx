import "./index.css";
import { Button, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { Home } from "react-feather";
import { useContext, useState } from "react";

import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { AuthContext } from "../../App";
import { toast } from "react-toastify";

export default function Header() {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/user/login", {
        username,
        password,
      });
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        setAuthToken(token);
        setLoggedIn(true);
      }
      toast.success("You are successfully logged in");
    } catch (error) {
      console.log(error);
      toast.success(error.message);

    }
  };

  const handleLogout = async () => {
    toast.success("You are successfully logged out");
    localStorage.clear();
    setLoggedIn(false);
    setAuthToken(null);
  };

  const handleRegister = async () => {
    try {
      await axios.post("/api/user/register", {
        username,
        password,
      });
      toast.success("You are successfully register");
    } catch (error) {
      console.log(error);
      toast.success(error.message);

    }
  };

  const renderNotLoggedIn = () => {
    return (
      <div className="d-flex gx-5 align-items-center">
        <Input
          placeholder="Username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          className="ms-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="ms-2" color="primary" onClick={handleLogin}>
          Login
        </Button>
        <Button className="ms-2" color="secondary" onClick={handleRegister}>
          Register
        </Button>
      </div>
    );
  };

  const renderLoggedIn = () => {
    return (
      <div className="d-flex gx-5 align-items-center">
        <div>Welcome aaa@gmail.com</div>
        <Link to="/create-link">Share a movie</Link>
        <Button className="ms-2" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    );
  };

  return (
    <div className="container-fluid shadow-sm sticky-top">
      <div className="container">
        <div className="d-flex justify-content-between p-1  bg-white ">
          <Link
            to="/"
            className="d-flex link-header align-items-center text-decoration-none text-black"
          >
            <Home size={"32px"} />
            <span className="ms-2 fs-2 fw-bold">Funny Movies</span>
          </Link>

          <div className="d-flex gx-5 align-items-center">
            {/* {renderNotLoggedIn()} */}

            {loggedIn ? renderLoggedIn() : renderNotLoggedIn()}
          </div>
        </div>
      </div>
    </div>
  );
}
