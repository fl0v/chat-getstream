import React, { Component } from "react";
import ChatContext from "contexts/ChatContext";

const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get('user_name');

class ChatProvider extends Component {
    state = {
        error: false,
        username: userName,
        handleError: this.handleError.bind(this),
        setUsername: this.setUsername.bind(this),
        hasUsername: this.hasUsername.bind(this),
        toggleProvider: this.toggleProvider.bind(this),
    };

    handleError() {
        this.setState({
            error: true,
        });
    }

    toggleProvider() {
        this.setState({
            error: false,
            username: "",
        });
    }

    setUsername(u) {
        this.setState({
            username: u,
        });
    }

    hasUsername {
        return this.state.username && this.state.username.length > 0;
    }

    render() {
        return ! this.hasUsername() ? (
            <User />
        ) : (
            <ChatContext.Provider value={this.state}>{this.props.children}</ChatContext.Provider>
        );
    }
}

export default ChatProvider;
