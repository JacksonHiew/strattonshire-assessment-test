import { io } from "socket.io-client";

const socket = io("http://192.168.1.246:3000", {
  reconnectionDelayMax: 10000,
});

export default socket;
