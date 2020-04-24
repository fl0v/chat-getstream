import React, { Component } from "react";

class ChatHeader extends Component {
    render() {
        const { label, data } = this.props;
        
        return (
            <div className='chat-header'>
                <div className='avatar-wrapper'>
                    <img src={data.image} />
                </div>
                <div>
                    <p className='chat-name'>{data.name}</p>
                    <span className='str-chat__header-livestream-left--livelabel'>{label}</span>
                </div>
                <span style={{ flex: "1 1 auto" }} />
            </div>
        );
    }
}

export default ChatHeader;
