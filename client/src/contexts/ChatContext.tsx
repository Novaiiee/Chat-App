import React, { createContext, FC, useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useFetch } from "../hooks/useFetch";
import { AuthContext } from "./AuthContext";

export interface ChatContextState {
  myChats: Chat[]
}

export const ChatContext = createContext({} as ChatContextState);

export const ChatProvider: FC = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [myChats, setMyChats] = useState<Chat[]>([]);

	const [, myChatsError, fetchMyChats] = useFetch<Chat[]>({
		start: false,
		url: "/chat/my",
		method: "GET",
  });

  const getMyChats = useCallback(async () => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const result = await fetchMyChats({ headers: { Authorization: `Bearer ${token}` } });

    if (myChatsError) {
			console.error(myChatsError);
			return;
		}
    
    setMyChats(result);
  }, [myChatsError, fetchMyChats])

  useEffect(() => {
		getMyChats();
	}, [user, getMyChats]);
  
	return <ChatContext.Provider value={{myChats}}>{children}</ChatContext.Provider>;
};
