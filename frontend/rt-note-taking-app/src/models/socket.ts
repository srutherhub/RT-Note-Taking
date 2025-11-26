interface ISocketManager {
  connect: () => void;
  disconnect: () => void;
  receive: (callback: (data: string) => void) => void;
  send: (data: string) => void;
}

export class SocketManager implements ISocketManager {
  private static socket = new WebSocket("ws://localhost:8080/ws");

  connect() {
    if (SocketManager.socket.readyState === WebSocket.OPEN) return;

    SocketManager.socket.onopen = () => {
      console.log("socket has been opened");
    };
    SocketManager.socket.onclose = (e) => {
      console.log("socket closed at: ", e.timeStamp);
    };
  }

  disconnect() {
    SocketManager.socket.close();
  }

  receive(callback: (data: string) => void) {
    SocketManager.socket.onmessage = (e) => {
      callback(e.data);
      console.log(e.data);
    };
  }

  send(data: string) {
    SocketManager.socket.send(data);
  }
}
