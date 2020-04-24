import React, { Component } from "react";
import ChatContext from "contexts/ChatContext";
import User from "components/User";

const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get("user_name") || localStorage.getItem('username');

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
    localStorage.setItem('username',u);
    this.setState({
      username: u
    });
  }

  hasUsername() {
    return this.state.username && this.state.username.length > 0;
  }

  render() {
    const { children } = this.props;
    return (
      <ChatContext.Provider value={this.state}>
      { this.hasUsername() ? children : <User /> } 
      </ChatContext.Provider>
    );
  }
}

export default ChatProvider;
