export interface BaseModel {
	id: number
	title: string
}

export interface Album extends BaseModel {
	slug: string
	year?: number
	content?: string
	userID: number
	pictures: Picture[]
}

export interface Picture extends BaseModel {
	year?: number
	content?: string
	image: string
	userID: number
}

export interface AlbumPicture {
	id: number
	albumId: string
	pictureId: string
}

export interface User {
	id: number
	username: string
	email: string
}

export interface UserServer extends User {
	emailVerifiedAt: string | null
	createdAt: string
	updatedAt: string
}

interface UserToken {
	token: string
	user: User
}

export interface AuthState {
	authUser: User | null
	token: string | null
	isLoggedIn: boolean
}

export interface LoginResponse {
	status: string
	message: string
	data: UserToken
}

export interface LoginData {
	status: boolean
	message: string
	user: UserServer
	token: string
}

export interface Login {
	email: string
	password: string
}

// function interface
export type LinkFormer = (
	toggle: () => void,
	path: string,
	text: string,
	cytxt?: string,
) => JSX.Element

export type Path = 'albums' | 'pictures'
// ##################### New types #########################
export type NewAlbum = Omit<Album, 'id' | 'slug' | 'userID' | 'pictures'>
export type UpdateAlbum = Omit<
	Album,
	'id' | 'slug' | 'pictures' | 'userID'
>
export type FormDataAlbum = Omit<Album, 'id' | 'slug' | 'userID' | 'pictures'>
export type NewPicture = Omit<Picture, 'id'>
export type UpdatePicture = Omit<
	Picture,
	'id' | 'image' | 'userID'
>

/** for albumpicture  */
export interface AlbumPictureProps {
	albumId: number
	pictureId: number
}

// export type DeleteAlbumPicture = NewAlbumPicture

// ####################### Intersection Types #########################
export type NewRecord = NewAlbum & NewPicture
export type OneRecord = Album & Picture
export type AllRecords = Album[] & Picture[]

// ####################### Api service Types #########################
export type IdUrlParams = {
	id: number
	url: string
}

export type SlugUrlParams = {
	slug: string
	url: string
}

export interface CreateOneParams<T> {
	url: string
	newRecord: T
}

// ####################### Utils #########################
export function // biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
hasOwnProperty<X extends 'object', Y extends PropertyKey>(
	obj: X,
	prop: Y,
): obj is X & Record<Y, unknown> {
	// biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
	return obj.hasOwnProperty(prop)
}

export function isUser(value: unknown): value is User {
	if (
		value !== null &&
		typeof value === 'object' &&
		'email' in value
	) {
		return true
	}
	return false
}

export function isAlbum(value: unknown): value is Album {
	if (
		value !== null &&
		typeof value === 'object' &&
		'pictures' in value
	) {
		return true
	}
	return false
}

export function isPictureArray(
	value: unknown,
): value is Picture[] {
	if (!Array.isArray(value)) {
		return false
	}

	if (value.some((v) => typeof v !== 'object')) {
		return false
	}
	return true
}

export function isAlbumArray(
	value: unknown,
): value is Album[] {
	if (!Array.isArray(value)) {
		return false
	}

	if (value.some((v) => typeof v !== 'object')) {
		return false
	}
	return true
}
