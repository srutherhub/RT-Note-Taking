import { useState } from "react";
import "./App.css";
import { SocketManager } from "./models/socket";

function App() {
  const [test, setTest] = useState("");
  const socket = new SocketManager();
  socket.connect();

  const sendMessage = (data: string) => {
    socket.send(data);
  };

  socket.receive((data) => {
    setTest(data);
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTest(e.target.value);
    sendMessage(e.target.value);
  };

  return (
    <>
      <input onChange={handleChange} value={test} />
      <p>{test}</p>
    </>
  );
}

export default App;
