import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import cascasePropsUp from "../helper/cascadeProps";

import { Avatar } from "antd";
//<Avatar stlye={{ "float": "left" }} size={50} icon="user" />

class Profile extends React.Component {


  render() {

    if (this.props.token === null) {
      return <Redirect to="/" />;
    }
    return (
      <div className="contact-profile">
        {this.props.username !== null ? (
          <cascasePropsUp>



            <p style={{ "width": "100%", "text-align": "center" }}>{this.props.selectedChat}</p>
            <div className="social-media">

            </div>
          </cascasePropsUp>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(Profile);
