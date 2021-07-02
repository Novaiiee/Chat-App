import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { ChatProvider } from "./contexts/ChatContext";
import "./css/tailwind.css";

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<ChatProvider>
				<App />
			</ChatProvider>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
