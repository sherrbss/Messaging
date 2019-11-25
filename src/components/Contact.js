import React from "react";
import { NavLink } from "react-router-dom";

import { Avatar } from "antd";

const Contact = props => (
  <NavLink to={`${props.chatURL}`} style={{ color: "#fff" }}>
    <li className="contact">
      <div className="wrap">
        <span className={`contact-status ${props.status}`} />
        {console.log("Contact - Status: ", props.status)}
        {console.log("Contact - Status: ", props.name)}

        <div className="meta">
          <Avatar size={50} icon="user" />
          <p className="name" style={{ "padding-left": "30%", "top": "10px" }}>{props.name}</p>
        </div>
      </div>
    </li>
  </NavLink>
);

export default Contact;
