interface User {
	realName: string;
	displayName: string;
	password: string;
	email: string;
	id: string;
	chatRooms: string[];
}

interface Chat {
	userIDs: string[];
	id: string;
	ownerID: string;
	name: string;
}


interface FormValues {
	email: string;
	password: string;
}