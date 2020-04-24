import React, { Component } from "react";
import ChatContext from "/src/contexts/ChatContext";
import User from "/src/components/User";

const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get("user_name") || "";

class ChatProvider extends Component {
  state = {
    error: false,
    username: userName,
    handleError: this.handleError.bind(this),
    setUsername: this.setUsername.bind(this),
    hasUsername: this.hasUsername.bind(this),
    toggleProvider: this.toggleProvider.bind(this)
  };

  handleError() {
    this.setState({
      error: true
    });
  }

  toggleProvider() {
    this.setState({
      error: false,
      username: ""
    });
  }

  setUsername(u) {
    this.setState({
      username: u
    });
  }

  hasUsername() {
    return this.state.username && this.state.username.length > 0;
  }

  render() {
    const content = !this.hasUsername() ? <User /> : this.props.children;
    return (
      <ChatContext.Provider value={this.state}>{content}</ChatContext.Provider>
    );
  }
}

export default ChatProvider;
