import React, { FC } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LandingPage } from "./pages/landing/LandingPage";

export const App: FC = () => {
	return (
		<div className="font-source-sans-pro h-screen">
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={LandingPage} />
				</Switch>
			</BrowserRouter>
		</div>
	);
};
