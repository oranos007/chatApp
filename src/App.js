import React, { useState } from "react";

import "stream-chat-react/dist/css/index.css";
// import { chatConfig } from "./config";
import { chatConfig } from "./config"; // Adjust the path to match your structure.
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from "stream-chat-react";
import { StreamChat } from "stream-chat";
import "stream-chat-react/dist/css/index.css";


const client = StreamChat.getInstance(chatConfig.apiKey);

const users = [
  { id: "student1", name: "Alice" },
  { id: "student2", name: "Bob" },
];

const App = () => {
  const [selectedUser, setSelectedUser] = useState(users[0]);

  client.connectUser(
    {
      id: selectedUser.id,
      name: selectedUser.name,
    },
    client.devToken(selectedUser.id)
  );

  const channel = client.channel("messaging", "react-chat", {
    name: "React Chat",
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Chat</h1>
        <select
          className="user-selector"
          onChange={(e) => setSelectedUser(users[e.target.value])}
        >
          {users.map((user, index) => (
            <option key={user.id} value={index}>
              {user.name}
            </option>
          ))}
        </select>
      </header>
      <Chat client={client} theme="team light">
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default App;
