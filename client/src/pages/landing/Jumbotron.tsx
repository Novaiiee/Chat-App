import React, { FC } from "react";
import { Navbar } from "../../components/Navbar";
import { Link } from "react-router-dom";

export const Jumbotron: FC = () => {
	return (
		<div className="bg-purple-500 h-full">
			<Navbar colour="white" />
			<div className="flex justify-center items-center h-90vh">
				<div className="flex flex-col items-center text-white space-y-5">
					<h1 className="text-8xl font-semibold">Chat-App</h1>
					<p className="">The best place to chat with your friends</p>
					<div className="flex items-center space-x-4">
						<Link to='/register' className="font-inter rounded-md shadow-md bg-white text-black font-semibold px-5 py-4 transition ease-in duration-75 hover:bg-opacity-75">
							Get Started
						</Link>
						<Link to="/login">Or Login</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
