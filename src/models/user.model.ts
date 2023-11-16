export interface IBaseUser {
	login: string;
	username: string;
}

export interface ICreateUser extends IBaseUser {
	password: string;
	private_key: string;
	public_key: string;
}

export interface ILoginUser extends Omit<IBaseUser, "username"> {
	password: string;
}

// ? Нужен ли отдельный интерфейс для аватарки? 
export interface IAvatarUser {
	avatar: string;
}

export interface IUser extends IBaseUser, IAvatarUser {}

export interface IToken {
	access_token: string;
	// refresh_token: string;
}

// export type IUpdateUser = ICreateUser;
