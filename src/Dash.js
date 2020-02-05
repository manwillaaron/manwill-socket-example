import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import "./css/Dash.css";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

function Dash(props) {
  const [users, setUsers] = useState([]);
  const [sessionAdmin, setAdmin] = useState({});
  const socket = io.connect("http://localhost:3210");

  useEffect(() => {
    socket.emit("connection");
    axios.get("/api/session").then(res => setAdmin(res.data));
    axios.get("/api/admins").then(res => setUsers(res.data));
  }, []);

  console.log({ sessionAdmin });
  const {name, id} = sessionAdmin
  return (
    <div id="chats-container">
      {/* <Link to="/login">Login</Link> */}
      {users.map((user, i) => (
        <Card
          style={{
            width: "20%",
            height: "50px",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          raised="true"
          key={`${user.id}${i}`}
        >
          <Link
            to={{
              pathname: `/chat/${user.id}/${id}/${name}`,
              state: {
                name: sessionAdmin.name,
                adminId: sessionAdmin.id
              }
            }}
          >
            <Button>chat with {user.name}</Button>
          </Link>
        </Card>
      ))}
    </div>
  );
}

export default withRouter(Dash);
