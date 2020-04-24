import React from "react"; // eslint-disable-line no-unused-vars
import LiveChat from "components/LiveChat";
import ChatProvider from "components/ChatProvider";
import "./App.scss";

const App = () => (
    <ChatProvider>
        <LiveChat />
    </ChatProvider>
);

export default App;
