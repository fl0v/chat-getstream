import React, { Component } from 'react'
import { StreamChat } from 'stream-chat'
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  MessageInputLarge,
  MessageLivestream,
  ChannelHeader,
  Thread,
  Window
} from 'stream-chat-react'
import 'stream-chat-react/dist/css/index.css'
import './App.css'

const urlParams = new URLSearchParams(window.location.search);
const apiKey = urlParams.get('api_key') || process.env.REACT_APP_CHAT_API_KEY;
const theme = urlParams.get('theme') || process.env.REACT_APP_CHAT_DEFAULT_THEME;
const channelType = 'livestream';
const channelId = urlParams.get('channel_id') || process.env.REACT_APP_CHAT_DEFAULT_CHANNEL_ID;
const channelName = urlParams.get('channel_name') || process.env.REACT_APP_CHAT_DEFAULT_CHANNEL_NAME;
const channelImage = urlParams.get('channel_image');
const userId = urlParams.get('user_id');
const userName = urlParams.get('user_name');
const userToken = urlParams.get('user_token');
const userImage = urlParams.get('user_image');

class App extends Component {
  constructor (props) {
    super(props);
    this.chatClient = new StreamChat(apiKey);
    this.chatClient.setUser(
      {
        id: userId,
        name: userName,
        image: userImage,
      },
      //userToken
      process.env.NODE_ENV === 'development' ? this.chatClient.devToken(userId) : userToken
    )
    this.channel = this.chatClient.channel(channelType, channelId, {
      name: channelName,
      image: channelImage,
      //example: 1
    })

    this.channel.watch()
  }

  render () {
    return (
      <Chat client={this.chatClient} theme={`livestream ${theme}`}>
        <Channel channel={this.channel}>
          <Window hideOnThread>
            <ChannelHeader live />
            <MessageList noGroupByUser Message={MessageLivestream} />
            <MessageInput Input={MessageInputLarge} />
          </Window>
          <Thread Message={MessageLivestream} fullWidth />
        </Channel>
      </Chat>
    )
  }
}

export default App
