import React from "react";
import { Route } from "react-router-dom";
import cascadeProps from "./helper/cascadeProps";

import Chat from "./containers/Chat";


const BaseRouter = () => (
  <cascadeProps>
    <Route exact path="/:chatID/" component={Chat} />
  </cascadeProps>
);

export default BaseRouter;
