import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import "./css/Login.css";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";

function Login(props) {
  let [inputValues, changes] = useState({
    email: "",
    password: ""
  });
  function handleChange(value, name) {
    changes({ ...inputValues, [name]: value });
  }

  // useEffect(() => {
  //   axios
  //     .get("/api/admin")
  //     .then(res => props.history.push("/"))
  //     .catch(err => console.log(err));
  // }, []);

  function login() {
    axios
      .post("/auth/login", {
        email: inputValues.email,
        password: inputValues.password
      })
      .then(res => props.history.push("/"))
      .catch(err => alert(err));
  }
  return (
    <Card id="login-container">
      <TextField
        style={{ width: "150px" }}
        value={inputValues.email}
        onChange={e => handleChange(e.target.value, e.target.name)}
        placeholder="email"
        name="email"
      />
      <TextField
        style={{ width: "150px" }}
        value={inputValues.password}
        onChange={e => handleChange(e.target.value, e.target.name)}
        name="password"
        placeholder="password"
      />
      <Button
        style={{ width: "150px" }}
        variant="contained"
        onClick={() => login()}
      >
        Submit
      </Button>
    </Card>
  );
}

export default withRouter(Login);
