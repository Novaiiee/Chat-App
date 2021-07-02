import React, { FC } from "react";
import { AiFillGithub } from "react-icons/ai";
import { Link } from 'react-router-dom';

interface Props {
	colour?: "white" | string;
}

export const Navbar: FC<Props> = ({ colour = "black" }) => {
	return (
		<div className={`flex flex-row items-center justify-between px-20 font-semibold h-10vh text-${colour}`}>
			<div className=''>
				<h1 className="text-xl">Chat-App</h1>
			</div>
			<div className="flex flex-row space-x-10">
				<Link to='/login' className="font-semibold">Login</Link>
				<a href="https://github.com/TwitoCode" target="blank">
					<AiFillGithub color="white" size={20} />
				</a>
			</div>
		</div>
	);
};
