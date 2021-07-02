import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";

interface Options {
	start: boolean;
	method: "GET" | "POST" | "PUT" | "DELETE";
	url: string;
}

type ReturnType<T> = [T, string, (options: AxiosRequestConfig) => Promise<T>];

const endpoint = "http://localhost:8000";

export function useFetch<T extends object>({ start = true, method, url }: Options): ReturnType<T> {
	const [value, setValue] = useState<T>();
	const [error, setError] = useState("");

	const fetch = useCallback(
		async (options: AxiosRequestConfig): Promise<T> => {
			return new Promise((resolve, reject) => {
				axios({ ...options, url: `${endpoint}${url}`, method })
					.then((res) => {
						setValue(res.data);
						resolve(res.data);
					})
					.catch((err: Error | AxiosError) => {
						if (axios.isAxiosError(err)) setError(err.response?.data.message);
						else setError(err.message);
					});
			});
		},
		[url, method]
	);

	useEffect(() => {
		if (!start) return;
		fetch({ url, method });
	}, [url, method, start, fetch]);

	return [value as T, error, fetch];
}
