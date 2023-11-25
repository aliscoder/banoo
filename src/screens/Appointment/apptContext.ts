import { createContext } from "react";
import { Socket } from "socket.io-client";

export const socketContext = createContext<Socket>({} as Socket);
