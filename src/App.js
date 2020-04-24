import React from "react"; // eslint-disable-line no-unused-vars
import LiveChat from "components/LiveChat";
import ChatProvider from "components/ChatProvider";

const App = () => (
    <ChatProvider>
        <LiveChat />
    </ChatProvider>
);

export default App;
