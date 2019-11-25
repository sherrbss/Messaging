import React from "react";
import { connect } from "react-redux";
import WebSocketInstance from "../websocket";
import cascasePropsUp from "../helper/cascadeProps";

import { Avatar } from "antd";

class Chat extends React.Component {
  state = {
    message: "",
    conversationID: ""
  };

  initialiseChat() {
    this.waitForSocketConnection(() => {
      WebSocketInstance.fetchMessages(
        this.props.username,
        this.props.match.params.chatID
      );
    });
    WebSocketInstance.connect(this.props.match.params.chatID);
  }

  constructor(props) {
    super(props);
    this.initialiseChat();
  }

  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(function () {
      if (WebSocketInstance.state() === 1) {
        console.log("Connection is made");
        callback();
        return;
      } else {
        console.log("wait for connection...");
        component.waitForSocketConnection(callback);
      }
    }, 100);
  }

  messageChangeHandler = event => {
    this.setState({ message: event.target.value });
  };

  sendMessageHandler = e => {
    e.preventDefault();
    const messageObject = {
      from: this.props.username,
      content: this.state.message,
      chatId: this.props.match.params.chatID
    };
    WebSocketInstance.newChatMessage(messageObject);
    this.setState({ message: "" });
  };





  renderTimestamp = timestamp => {
    return `${new Date(timestamp)}`;
  };


  //(this.setState({ conversationID: message.author != this.props.username ? message.author : {} }))
  renderMessages = messages => {

    messages.map((message, i, arr) => (
      message.author != this.props.username ? console.log("SELECTED CONVERSATION: ", message.author) : {}

    ));
    console.log("CHAT - PARTICIPANT - STATE: ", this.state.conversationID)


    const currentUser = this.props.username;
    const tempMessages = messages.map((message, i, arr) => (

      <li
        key={message.id}
        style={{ marginBottom: arr.length - 1 === i ? "45px" : "15px" }}
        className={message.author === currentUser ? "sent" : "replies"}

      >
        <Avatar style={message.author === currentUser ? { "float": "right" } : {}} size={50} icon="user" />

        <p>
          {message.content}
          <br />
          <small>{this.renderTimestamp(message.timestamp)}</small>
        </p>
      </li>


    ));

    return tempMessages;
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.chatID !== newProps.match.params.chatID) {
      WebSocketInstance.disconnect();
      this.waitForSocketConnection(() => {
        WebSocketInstance.fetchMessages(
          this.props.username,
          newProps.match.params.chatID
        );
      });
      WebSocketInstance.connect(newProps.match.params.chatID);
    }
  }

  /* 
  <div>
            {this.props.messages.map((message, i, arr) => (
              message.author != this.props.username ? <h1>{message.author}</h1> : <div style={{ "display": "none" }}></div>

            ))}

          </div>
  
  */

  render() {
    return (
      <cascasePropsUp>
        {}
        <div className="messages">

          <ul id="chat-log">
            {this.props.messages && this.renderMessages(this.props.messages)}

            <div
              style={{ float: "left", clear: "both" }}
              ref={el => {
                this.messagesEnd = el;
              }}
            />
          </ul>
        </div>
        <div className="message-input">
          <form onSubmit={this.sendMessageHandler}>
            <div className="wrap">
              <input
                onChange={this.messageChangeHandler}
                value={this.state.message}
                required
                id="chat-message-input"
                type="text"
                placeholder="Write your message..."
              />
              <i className="fa fa-paperclip attachment" aria-hidden="true" />
              <button id="chat-message-submit" className="submit">
                <i className="fa fa-paper-plane" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </cascasePropsUp>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    messages: state.message.messages,
    conversationID: state.message.conversationID
  };
};

export default connect(mapStateToProps)(Chat);
