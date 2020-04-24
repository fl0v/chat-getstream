import React from "react"; // eslint-disable-line no-unused-vars
import LiveChat from "/src/components/LiveChat";
import ChatProvider from "/src/components/ChatProvider";

const App = () => (
    <ChatProvider>
        <LiveChat />
    </ChatProvider>
);

export default App;
