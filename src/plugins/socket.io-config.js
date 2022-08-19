import { io } from "socket.io-client";

const socket = io("http://13.232.218.15:3000", {
  reconnectionDelayMax: 10000,
});

export default socket;
