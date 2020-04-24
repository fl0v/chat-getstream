import React, { Component } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  Window,
  Thread,
  ChannelHeader,
  MessageList,
  MessageInput,
  MessageInputLarge,
  MessageLivestream,
  Message
} from "stream-chat-react";
import { extractEmoji } from "extract-emoji";
import Reward from "react-rewards";
import "stream-chat-react/dist/css/index.css";
import ChatContext from "/src/contexts/ChatContext";
import ChatHeader from "./ChatHeader";
import "./styles.scss";

const urlParams = new URLSearchParams(window.location.search);
const apiKey = urlParams.get("api_key") || process.env.REACT_APP_CHAT_API_KEY;
const theme =
  urlParams.get("theme") || process.env.REACT_APP_CHAT_DEFAULT_THEME;
const channelId =
  urlParams.get("channel_id") || process.env.REACT_APP_CHAT_DEFAULT_CHANNEL_ID;
const channelName =
  urlParams.get("channel_name") ||
  process.env.REACT_APP_CHAT_DEFAULT_CHANNEL_NAME;
const channelImage = urlParams.get("channel_image");
const userId = urlParams.get("user_id");
const userToken = urlParams.get("user_token");
const userImage = urlParams.get("user_image");

// Stream Chat //
const chatClient = new StreamChat(apiKey);

const rocketKeywords = ["boom", "rocket", "liftoff"];
const loveKeywords = ["love", "like", "amazing"];
const wowKeywords = ["woah", "wow", "omg", "wtf"];

class LiveChat extends Component {
  static contextType = ChatContext;

  constructor(props) {
    super(props);
    console.log(this.context);
    chatClient.disconnect();
    chatClient.setUser(
      {
        id: userId,
        //name: this.context.username,
        image: userImage
      },
      //userToken
      process.env.NODE_ENV === "development"
        ? chatClient.devToken(userId)
        : userToken
    );
    this.state = {
      channel: chatClient.channel("livestream", channelId, {
        name: channelName,
        image: channelImage
      }),
      emoji: ["🚀"]
    };
    this.setRewardRef = this.setRewardRef.bind(this);
  }

  async componentDidMount() {
    await this.state.channel.watch();
    this.state.channel.on("message.new", this.handleNewMessage);
    this.state.channel.on("reaction.new", this.handleNewReaction);
  }

  componentWillUnmount() {
    this.state.channel.off("message.new", this.handleNewMessage);
    this.state.channel.off("reaction.new", this.handleNewReaction);
    chatClient.disconnect();
  }

  checkForKeywords(keyword, text) {
    return new RegExp(keyword).test(text);
  }

  handleNewMessage = async ({ message }) => {
    const emoji = extractEmoji(message.text);
    if (emoji.length) {
      await this.setState({
        emoji
      });
      this.reward.rewardMe();
    }

    if (
      rocketKeywords.some(keyword =>
        this.checkForKeywords(keyword, message.text)
      )
    ) {
      await this.setState({
        emoji: ["🚀"]
      });
      this.reward.rewardMe();
    }

    if (
      loveKeywords.some(keyword => this.checkForKeywords(keyword, message.text))
    ) {
      await this.setState({
        emoji: ["❤️", "😍"]
      });
      this.reward.rewardMe();
    }

    if (
      wowKeywords.some(keyword => this.checkForKeywords(keyword, message.text))
    ) {
      await this.setState({
        emoji: ["😲", "😦", "😮"]
      });
      this.reward.rewardMe();
    }
  };

  handleNewReaction = async ({ reaction }) => {
    const emojiMap = {
      like: ["👍"],
      love: ["❤️", "💙", "💚", "💛", "💜", "🧡"],
      haha: ["😂", "🤣"],
      wow: ["😲", "😦", "😮"],
      sad: ["😔", "😢", "😭"],
      angry: ["😠", "😡"]
    };

    await this.setState({
      emoji: emojiMap[reaction.type]
    });

    this.reward.rewardMe();
  };

  setRewardRef(el) {
    this.reward = el;
  }

  get rewardConfig() {
    const { emoji } = this.state;
    return {
      emoji,
      elementSize: 40,
      spread: 160
    };
  }

  render() {
    return (
      <div className="chat-wrapper">
        <Chat client={chatClient} theme={`livestream ${theme}`}>
          <Channel channel={this.state.channel}>
            <div className="emoji-wrapper">
              <Reward
                decay={1}
                decay={2000}
                zIndex={999}
                ref={this.setRewardRef}
                type="emoji"
                config={this.rewardConfig}
              />
            </div>
            <Window hideOnThread>
              <ChatHeader label="Live" data={this.state.channel.data} />
              {/* <ChannelHeader live /> */}

              <MessageList Message={this.renderMessage} />
              {/* <MessageList noGroupByUser Message={MessageLivestream} /> */}

              <MessageInput />
              {/* <MessageInput Input={MessageInputLarge} /> */}
            </Window>

            <Thread Message={Message} fullWidth />
            {/* <Thread Message={MessageLivestream} fullWidth /> */}
          </Channel>
        </Chat>
      </div>
    );
  }
}

export default LiveChat;
