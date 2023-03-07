import React, { useState } from "react";
import "./App.css";
import Result from "./components/Result";
import Featured from "./components/Featured";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, createContext } from "react";
import Form from "./components/Form";
import { Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import logo from "./logo.png";

import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import FavouritePets from "./components/FavouritePets";
import Local from "./helpers/Local";
import Api from "./helpers/Api";

function App() {
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);
  const [token, setToken] = useState(null);
  const OAUTH_URL = "https://api.petfinder.com/v2/oauth2/token";
  const PETFINDER_URL = `/v2/animals`;
  //const CLIENT_ID = "HXrybFRPtRK41Nieti4Kj8t0Nzq2eD0zS5IUfSFbcqwMXE9qPC";
  //const CLIENT_SECRET = "CYTIwKHusDjEZyhlPDPsZLo7fHXrcCGBV9uw1ub6";
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(Local.getUser()); //why Local.getuser here but in the state is unly setUser?
  const [LoginErrorMsg, setLoginErrorMsg] = useState("");
  const [favouritePets, setFavouritePets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getToken();
  }, []);

  async function getToken() {
    let credentials = {
      grant_type: "client_credentials",
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
    };

    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    };

    let response = await fetch(OAUTH_URL, options);
    if (response.ok) {
      let data = await response.json();
      //console.log("response: Token etc", data);
      setToken(data.access_token);
    } else {
      console.log(
        `Error in getToken(): ${response.status}: ${response.statusText}`
      );
    }
  }

  async function printPets(form) {
    let options = {
      headers: { Authorization: `Bearer ${token}` },
    };
    setLoading(true);
    setError("");
    const PET_TYPE = `/v2/animals?type=${form.type}`;
    let response = await fetch(PET_TYPE, options);

    if (response.ok) {
      let data = await response.json();
      //console.log("response:all pets", data.animals);
      setResults(data.animals);
    } else {
      setError(
        `No ${form.type} found. ${response.status}: ${response.statusText}`
      );
    }
    setLoading(false);
  }

  const addUser = async (email, username, password) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    };

    try {
      let response = await fetch("auth/register", options);
      if (response.ok) {
        console.log("Success!");
      } else {
        setError("Failed to register, try again later.");
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  };

  const loginUser = async (username, password) => {
    try {
      let myresponse = await Api.loginUser(username, password);
      if (myresponse.ok) {
        Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
        setUser(myresponse.data.user);
        navigate("/");
      } else {
        setLoginErrorMsg("Login failed");
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  };

  const logoutUser = async () => {
    Local.removeUserInfo();
    setUser(null);
    navigate("/");
  };

  const getAllFavouritePets = async () => {
    let results = await Api.getAllFavourite();
    setFavouritePets(results.data);
  };

  return (
    //* Nav Bar
    <div className="App">
      <section>
        <div>
          <nav>
            <a href="/">
              <img src={logo} alt="this is a logo" />
            </a>
            {/* These are fake buttons with no functionality */}
            <button>About us</button>
            <button>Pet Care</button>
            <button>Ways to support</button>
            <button>Contact us</button>
            {user ? (
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  {user.username}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/favourites">
                    Favourite pets
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="/" onClick={logoutUser}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div>
                <Link to="/login">
                  <button>Login</button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </section>
      <section className="home">
        <div>
          <Routes>
            <Route path="/" element={<Form printPets={printPets} />} />
            <Route
              path="/Result/*"
              element={
                <Result
                  results={results}
                  user={user}
                  favouritePets={favouritePets}
                  getAllFavouritePets={getAllFavouritePets}
                />
              }
            />
            <Route
              path="/Featured/:id"
              element={<Featured results={results} />}
            ></Route>
            <Route
              path="/Register"
              element={<RegisterForm addUser={addUser} />}
            />
            <Route
              path="/login"
              element={<LoginForm loginUser={loginUser} />}
            />
            <Route
              path="/favourites"
              element={
                <FavouritePets
                  favouritePets={favouritePets}
                  setFavouritePets={setFavouritePets}
                  getAllFavouritePets={getAllFavouritePets}
                />
              }
            />
          </Routes>
          {loading && (
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}

          {error && <div className="bcg-sorry" />}
        </div>
      </section>
    </div>
  );
}

export default App;
