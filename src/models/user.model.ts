export interface IBaseUser {
	login: string;
	username: string;
}
export interface IRegisterUser extends IBaseUser {
  password: string;
  is_admin: boolean;
}

export interface ICreateUser extends Omit<IRegisterUser, "password"> {
	priv_key: string;
	pub_key: string;
	hash_key: string;
	auth_hash: string;
}
export interface ILoginUser extends Omit<IBaseUser, "username"> {
	password: string;
}


// ? Нужен ли отдельный интерфейс для аватарки?
export interface IAvatarUser {
	avatar_path: string;
}

export interface IUser extends IBaseUser, IAvatarUser {
	is_admin: boolean;
}

export interface IUpdateUser {
	new_username: string;
}

// ? Нужен ли данный интерфейс?
export interface IToken {
	access_token: string;
	// refresh_token: string;
}
