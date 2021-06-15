import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import React, { FC } from "react";

interface Props {}

export const Navbar: FC<Props> = ({}) => {
	return (
		<AppBar>
			<Toolbar>
				<Typography variant="h6">News</Typography>
				<Button color="inherit">Login</Button>
			</Toolbar>
		</AppBar>
	);
};
