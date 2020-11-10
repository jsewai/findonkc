import React from "react";
import { Switch, Route } from "react-router-dom";

import ItemLayout from "./container/ItemLayout"
import Bookmark from "./container/Bookmark";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import history from './history';


const BaseRouter = () => (
  <Switch history={history}>
    <Route exact path="/" component={ItemLayout} />{" "}
    <Route exact path="/login/" component={LogIn} />{" "}
    <Route exact path="/signup/" component={SignUp} />{" "}
    <Route exact path="/bookmark/" component={Bookmark} />{" "}
  </Switch>
);

export default BaseRouter;
