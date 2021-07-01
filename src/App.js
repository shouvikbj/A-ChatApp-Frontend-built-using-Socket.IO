import "./App.css";

import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";

const socket = io("http://localhost:5000");
const userName = nanoid(6);

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { userName, message });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  }, [chat]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatty App</h1>

        <div>
          {chat.map((payload, index) => {
            return (
              <p key={index}>
                <span>{payload.userName}</span>
                {" => "}
                {payload.message}
              </p>
            );
          })}
        </div>

        <form onSubmit={sendChat}>
          <input
            type="text"
            name="chat"
            placeholder="send text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
