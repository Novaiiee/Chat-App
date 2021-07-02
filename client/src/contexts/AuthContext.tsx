import React, { createContext, FC, useCallback, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

export interface AuthContextState {
	user: User | null;
	login: (v: FormValues) => Promise<void>
}

interface LoginResult {
	token: string;
	user: User;
}

export const AuthContext = createContext({} as AuthContextState);

export const AuthProvider: FC = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [, autoLoginError, autoLoginUser] = useFetch<LoginResult>({
		start: false,
		url: "/auth/login-jwt",
		method: "POST",
	});

	const [, loginError, loginUser] = useFetch<LoginResult>({
		start: false,
		url: "/auth/login",
		method: "POST",
	});

	const login = async (values: FormValues) => {
		const result = await loginUser({ data: values });
		
		if (loginError) {
			console.error(loginError);
			return;
		}
	};

	const loginJwt = useCallback(
		async (token: string) => {
			const result = await autoLoginUser({
				headers: { Authorization: `Bearer ${token}` },
			});

			if (autoLoginError) {
				console.error(autoLoginError);
				return;
			}

			localStorage.setItem("ACCESS_TOKEN", result.token);
			setUser(result.user);
		},
		[autoLoginError, autoLoginUser]
	);

	useEffect(() => {
		const token = localStorage.getItem("ACCESS_TOKEN");
		if (token) loginJwt(token);
	}, [loginJwt]);

	return <AuthContext.Provider value={{ user, login }}>{children}</AuthContext.Provider>;
};
