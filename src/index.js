import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import sha256 from "./components/sha256";
import Home from "./components/Home";
import Login from "./components/Login";
function Main() {
  const [login, setLogin] = React.useState(true);
  const [username, setUsername] = React.useState("");
  const [passwd, setPasswd] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);

  function handleNameChange(event) {
    setUsername(event.target.value);
  }
  function handlePasswdChange(event) {
    setPasswd(event.target.value);
  }
  function submitLogin() {
    setLoading(true);
    var hashedpasswd = sha256(passwd);
    if (username !== "" && passwd !== "") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, passwd: hashedpasswd })
      };
      fetch(
        "https://login-backend.divu050704.repl.co/api/login",
        requestOptions
      )
        .then((res) => res.json())
        .then((last) => {
          if (last !== null) {
            setStatus("Logged in as " + last.username);
            setUsername(last.username);
            setLoggedIn(true);
          } else {
            setStatus("Wrong username or password");
          }
          setLoading(false);
        });
    } else {
      setStatus("All fields are required");
      setLoading(false);
    }
  }
  function submitSignup() {
    var hashedpasswd = sha256(passwd);
    if (username !== "" && passwd !== "") {
      setLoading(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, passwd: hashedpasswd })
      };
      fetch(
        "https://login-backend.divu050704.repl.co/api/signup",
        requestOptions
      )
        .then((res) => res.json())
        .then((last) => {
          last.Created === "OK"
            ? setStatus("Account Created!")
            : setStatus("Account already exists");
          setLoading(false);
        });
    } else {
      setStatus("All fields are required");
    }
  }
  function handleHidden() {
    setIsHidden((prev) => !prev);
  }
  function handleLoginChange() {
    setLogin((prev) => !prev);
  }
  function handleLogOut() {
    setLoggedIn(false);
    setLogin(true);
    setUsername("");
    setPasswd("");
    setLoading(false);
    setIsHidden(true);
    setStatus("");
  }
  return (
    <div>
      {!loggedIn && (
        <Login
          username={username}
          login={login}
          status={status}
          loading={loading}
          passwd={passwd}
          handlePasswdChange={handlePasswdChange}
          handleNameChange={handleNameChange}
          isHidden={isHidden}
          handleHidden={handleHidden}
          submitLogin={submitLogin}
          handleLoginChange={handleLoginChange}
          submitSignup={submitSignup}
        />
      )}
      {loggedIn && (
        <Home
          username={username}
          handleLogOut={handleLogOut}
          style={{ overflow: "hidden !important" }}
        />
      )}
    </div>
  );
}
ReactDOM.render(<Main />, document.getElementById("root"));
