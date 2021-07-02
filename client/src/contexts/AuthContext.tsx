import React, { createContext, FC, useCallback, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

export interface AuthContextState {
	user: User | null;
}

interface LoginResult {
	token: string;
	user: User;
}

export const AuthContext = createContext({} as AuthContextState);

export const AuthProvider: FC = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loginResult, loginError, loginUser] = useFetch<LoginResult>({
		start: false,
		url: "/auth/login",
		method: "POST",
	});

	// const login = async () => {};

	const loginJwt = useCallback(
		async (token: string) => {
			await loginUser({
				headers: { Authorization: `Bearer ${token}` },
				data: { email: "toheebeji@gmail.com", password: "twilight123" },
			});

			if (loginError) {
				console.log(loginError);
				return;
			}

			localStorage.setItem("ACCESS_TOKEN", loginResult.token);
			setUser(loginResult.user);
		},
		[loginError, loginUser, loginResult]
	);

	useEffect(() => {
		const token = localStorage.getItem("ACCESS_TOKEN");
		if (token) loginJwt(token);
	}, [loginJwt]);

	return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
