import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import './css/Header.css'

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import { DialogTitle } from '@material-ui/core';

function Header(props) {
  function logout() {
    axios.delete("/api/logout").then(_ => props.history.push("/login"));
  }

  return (
    <header>
      <DialogTitle>SOCKET EXAMPLE</DialogTitle>
      <Button onClick={() => logout()}>Logout</Button>
    </header>
  );
}

export default withRouter(Header);
