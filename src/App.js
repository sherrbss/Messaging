import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import Sidepanel from "./containers/Sidepanel";
import Profile from "./containers/Profile";
import * as actions from "./store/actions/auth";
import * as messageActions from "./store/actions/message";
import WebSocketInstance from "./websocket";
import "./assets/style.css";

import 'antd/dist/antd.css';
import { Layout } from "antd";
const { Header, Content, Sider } = Layout;
//added above import

class App extends React.Component {
  componentDidMount() {
    this.props.autoSignIn();
  }

  constructor(props) {
    super(props);
    WebSocketInstance.addCallbacks(
      this.props.setMessages.bind(this),
      this.props.addMessage.bind(this)
    );
  }

  state = { selectedMessage: "" }
  callbackFunction = (childData) => {
    this.setState({ selectedMessage: childData })
  }

  render() {
    return (
      <Router>
        <div id="frame">

          <Layout>
            <Sider width={this.props.authenticated ? '30%' : '100%'}>
              <Sidepanel parentCallback={this.callbackFunction} />
            </Sider>


            <Content width={this.props.authenticated ? '70%' : '0%'}>
              <div className="content">

                <Profile selectedChat={this.state.selectedMessage} />
                {console.log("App - Profile - parentCallback: ", this.state.selectedMessage)}
                <BaseRouter />

              </div>
            </Content>
          </Layout>



        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    autoSignIn: () => dispatch(actions.authCheckState()),
    addMessage: message => dispatch(messageActions.addMessage(message)),
    setMessages: messages => dispatch(messageActions.setMessages(messages))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
