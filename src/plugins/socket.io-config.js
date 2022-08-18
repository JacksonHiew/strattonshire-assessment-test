import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  reconnectionDelayMax: 10000,
});

export default socket;
