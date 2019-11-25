import React from "react";

import { Spin, Icon, Menu, Dropdown, Avatar } from "antd";

import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import * as messageActions from "../store/actions/message";
import Contact from "../components/Contact";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Sidepanel extends React.Component {
  state = {
    loginForm: true
  };

  waitForAuthDetails() {
    const component = this;
    setTimeout(function () {
      if (
        component.props.token !== null &&
        component.props.token !== undefined
      ) {
        component.props.getUserChats(
          component.props.username,
          component.props.token
        );
        return;
      } else {
        console.log("waiting for authentication details...");
        component.waitForAuthDetails();
      }
    }, 100);
  }

  componentDidMount() {
    this.waitForAuthDetails();
  }



  changeForm = () => {
    this.setState({ loginForm: !this.state.loginForm });
  };

  authenticate = e => {
    e.preventDefault();
    if (this.state.loginForm) {
      this.props.login(e.target.username.value, e.target.password.value);
    }
  };

  render() {
    let currName = this.props.username;
    console.log("Sidepanel - currName", currName)
    let activeChats = this.props.chats.map(c => {
      { console.log("Sidepanel - Participants", c.participants) }
      { console.log("Sidepanel - Current slug", c.id) }
      let currentParticipant = c.participants[0] != currName ? c.participants[0] : c.participants[1];
      this.props.parentCallback(currentParticipant);
      return (
        <Contact
          key={c.id}
          name={currentParticipant}
          picURL="http://website.png"
          status="busy"
          chatURL={`/${c.id}`}
        />
      );
    });

    const menu = (
      <Menu>
        <Menu.Item>
          <a onClick={this.props.logout}><Icon type="logout" /> Log Out</a>
        </Menu.Item>
      </Menu>
    );

    /*

      <img
        id="profile-img"
        src="http://website.png"
        className="online"
        alt=""
      />

      <button onClick={() => this.props.logout()} className="authBtn">
                  <span>Logout</span>
                </button>


    */


    return (

      <div id="sidepanel">

        <div id="profile" style={this.props.isAuthenticated ? { "height": "10%" } : { "height": "100%" }}>
          <div className="wrap">

            <div id="usercard" style={this.props.isAuthenticated ? { "height": "100%" } : { "height": "20%" }}>
              {this.props.isAuthenticated ?
                <Dropdown overlay={menu}>
                  <a className="ant-dropdown-link" style={{ "width": "100%" }}>
                    <Avatar size={50} icon="user" />
                    <span className="" style={{ "width": "100%", "padding-left": "25%", "font-size": "24px", "font-weight": "600" }}>{this.props.username}</span>
                  </a>
                </Dropdown> :
                <div className="" style={{ "text-align": "center", "position": "relative", "height": "100%" }} >
                  <h1 style={{ "color": "white", "position": "absolute", "bottom": "0", "width": "100%" }}>Messaging System</h1>
                </div>
              }
            </div>




            <div id="expanded" style={this.props.isAuthenticated ? { "display": "none" } : { "height": "80%" }} >
              {this.props.loading ? (
                <Spin indicator={antIcon} />
              ) : this.props.isAuthenticated ? (
                <div style={{ "display": "none" }}></div>
              ) : (
                    <div>
                      <form method="POST" onSubmit={this.authenticate}>
                        {this.state.loginForm ? (
                          <div>
                            <input
                              name="username"
                              type="text"
                              placeholder="username"
                            />
                            <input
                              name="password"
                              type="password"
                              placeholder="password"
                            />
                          </div>
                        ) : (
                            <div style={{ "display": "none" }}></div>
                          )}

                        <button type="submit">Login</button>
                      </form>


                    </div>
                  )}
            </div>
          </div>
        </div>

        {this.props.isAuthenticated ?
          <div id="contacts" style={{ "height": "90%", "border-top": "1px solid grey" }} >
            <h3 style={{ "text-align": "center", "color": "white" }}>Messages</h3>
            <ul>{activeChats}</ul>
          </div>
          : <div style={{ "display": "none" }}></div>}


      </div>

    );
  }
}

/*

<div id="bottom-bar" style={{ display: "none" }} >
  <button id="addChat" onClick={() => this.openAddChatPopup()}>
    <i className="fa fa-user-plus fa-fw" aria-hidden="true" />
    <span>Create chat</span>
  </button>
  <button id="settings" >
    <i className="fa fa-cog fa-fw" aria-hidden="true" />
    <span>Settings</span>
  </button>
</div>

<div id="search" style={{ display: "none" }} >
  <label htmlFor="">
    <i className="fa fa-search" aria-hidden="true" />
  </label>
  <input type="text" placeholder="Search Chats..." />
</div>

*/
// <button onClick={this.changeForm}>Switch</button>

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
    token: state.auth.token,
    username: state.auth.username,
    chats: state.message.chats,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (userName, password) =>
      dispatch(actions.authLogin(userName, password)),
    logout: () => dispatch(actions.logout()),
    getUserChats: (username, token) =>
      dispatch(messageActions.getUserChats(username, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidepanel);
