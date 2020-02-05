import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { withRouter } from "react-router-dom";
import "./css/Chat.css";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";

import Avatar from "@material-ui/core/Avatar";

function Chat(props) {
  const [input, handleChange] = useState("");
  let [messages, updateMsgs] = useState([]);
  let [chatroomId, updateChatroomId] = useState(0);
  const socket = io.connect("http://localhost:3210");

  console.log(props.match)
  useEffect(() => {
    if (props.match.params.id) {
      socket.emit("join", {
        otherId: props.match.params.id,
        id: props.match.params.sessionAdminId
      });
    }

    socket.on("login completed", body => {
      updateMsgs((messages = [...body.chatroomMessages]));
      updateChatroomId((chatroomId = body.chatroomId));
    });
  }, []);

  useEffect(() => {
    socket.on("incoming", body => {
      updateMsgs((messages = [body[0], ...messages]));
    });
  },[]);

  function messageToServer() {
    const {senderName, sessionAdminId } = props.match.params
    socket.emit("message to server", {
      senderId: sessionAdminId,
      content: input,
      chatroomId,
      senderName 
    });
    handleChange("");
  }

  return (
    <div className="chat-page">
      <div>
        <TextField
          value={input}
          onChange={e => handleChange(e.target.value)}
          id="standard-basic"
          multiline="true"
          label="Message"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => messageToServer()}
        >
          Send
        </Button>
      </div>
      <div className="messages-container">
        {messages.map(msg => (
          <div
          key={msg.id}
            className={
              +msg.sender_id === +props.match.params.sessionAdminId
                ? "message-card-sender"
                : "message-card-receiver"
            }
          >
            <Avatar
              className={
                +msg.sender_id === +props.match.params.sessionAdminId
                  ? "avatar-icon-sender"
                  : "avatar-icon-receiver"
              }
            >
              {msg.sender_name}
            </Avatar>
            <Card
              className={
                +msg.sender_id === +props.match.params.sessionAdminId
                  ? "card-sender"
                  : "card-receiver"
              }
              raised="true"
              key={`${msg.id}`}
            >
              <h5>{msg.content}</h5>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withRouter(Chat);
