package server

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

var clients = make(map[*websocket.Conn]bool)
var upgrader = websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }}

func InitWS() {
	http.HandleFunc("/ws", handleConnections)
	fmt.Println("web socket started on localhost:8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println("error starting server", err)
	}
}

func handleConnections(w http.ResponseWriter, r *http.Request) {

	ws, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		fmt.Println(err)
	}
	defer ws.Close()

	clients[ws] = true
	fmt.Println(clients)

	for {
		_, msg, err := ws.ReadMessage()
		if err != nil {
			fmt.Println("error reading msg:", err)
			delete(clients, ws)
			break
		}
		for client := range clients {
			if err := client.WriteMessage(websocket.TextMessage, msg); err != nil {
				fmt.Println("write error:", err)
				delete(clients, client)
				break
			}
		}
	}

}
