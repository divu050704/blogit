import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import sha256 from "./components/sha256";
import Home from "./components/Home";
import Login from "./components/Login";
function Main() {
  // State for checking whether the user wants to login or sign up
  const [login, setLogin] = React.useState(true);
  // State for username field
  const [username, setUsername] = React.useState("");
  // State for password field
  const [passwd, setPasswd] = React.useState("");
  // State for the top hidden heading which is shown when the username or password is incorrect
  const [status, setStatus] = React.useState("");
  // State for the Loading animation of buttons
  const [loading, setLoading] = React.useState(false);
  // State for password to be hidden
  const [isHidden, setIsHidden] = React.useState(true);
  // State for checking whether the user is logged in or not
  const [loggedIn, setLoggedIn] = React.useState(false);
  // Update State with change in the value of input box
  function handleNameChange(event) {
    setUsername(event.target.value);
  }
  // Update State with change in the value of input box
  function handlePasswdChange(event) {
    setPasswd(event.target.value);
  }
  function submitLogin() {
    // Set loading status while the function is being completed
    setLoading(true);
    // Converted password to sha256
    var hashedpasswd = sha256(passwd);
    // Neither username nor password field should be empty
    if (username !== "" && passwd !== "") {
      // request options for fotch with post method 
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
          // Mongodb labrary in the backend returns null value when the username or password is wrong with findOne() function
          if (last !== null) {
            // Status being Set
            setStatus("Logged in as " + last.username);
            // finally for confirmation
            setUsername(last.username);
            // Logged in is set for true and the user is authenticated to go forward
            setLoggedIn(true);
          } else {
            // The status will be set to wrong username or password
            setStatus("Wrong username or password");
          }
          // finally to end the opacity of button the loading is set to false
          setLoading(false);
        });
    } else {
      // If either field is empty
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
       //the backend API will return {"Created" : "OK"} when  it will be able to create new user, i.e., no user with this usernmae exists else return {"Created": "No"}
        // Using ternary operators
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
  // This function will set everything to default state
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
