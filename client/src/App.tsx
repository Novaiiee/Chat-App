import { Button } from "@material-ui/core";
import React, { FC } from "react";
import { Navbar } from "./components/Navbar";

export const App: FC = () => {
	return (
		<div>
			<Navbar />
			<Button color="secondary">Press start</Button>
		</div>
	);
};
