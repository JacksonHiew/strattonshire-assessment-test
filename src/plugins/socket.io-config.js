import { io } from "socket.io-client";

const socket = io("http://192.168.1.154:3000", {
  reconnectionDelayMax: 10000,
});

export default socket;
