import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Chat from "./Chat";
import Dash from "./Dash";
import Header from "./Header";
import './css/routes.css'

export default (
  <div id='routes-container'>
    <Header />
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" exact component={Dash} />
      <Route path="/chat/:id/:sessionAdminId/:senderName" component={Chat} />
    </Switch>
  </div>
);
