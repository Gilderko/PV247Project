import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	onAuthStateChanged,
	User
} from 'firebase/auth';
import {
	collection,
	CollectionReference,
	doc,
	DocumentReference,
	getFirestore,
	Timestamp
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBSpUwyp8gMJc0cJsni6Cz_5JL-PR-ibtg',
	authDomain: 'pv247projectfurniture.firebaseapp.com',
	projectId: 'pv247projectfurniture',
	storageBucket: 'pv247projectfurniture.appspot.com',
	messagingSenderId: '252845897373',
	appId: '1:252845897373:web:7868c95cf7ea9f1e838674'
};

// Initialize Firebase
initializeApp(
	// Done: Add project config from https://console.firebase.google.com/u/0/project/<<porjectId>>/settings/general/web
	firebaseConfig
);

// Authentication
const auth = getAuth();

// Sign up handler
export const signUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

// Sign in handler
export const signIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

// Sign out handler
export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);

// Firestore
const db = getFirestore();

// Reviews collection
export type Review = {
	byEmail: string;
	stars: number;
	description?: string;
	createdAt: Timestamp;
};

export const reviewsDocument = (furId: string, reviewId: string) =>
	doc(
		db,
		'furnitures',
		furId,
		'reviews',
		reviewId
	) as DocumentReference<Review>;

export const reviewsCollection = (furId: string) =>
	collection(db, 'furnitures', furId, 'reviews') as CollectionReference<Review>;

// Users info collection
export type UserInfo = {
	userEmail: string;
	name: string;
	birthDate: Date;
	profileImageURL: string;
};

export const userinfosCollection = collection(
	db,
	'userInfos'
) as CollectionReference<UserInfo>;

export const userInfoDocument = (id: string) =>
	doc(db, 'userInfos', id) as DocumentReference<UserInfo>;

// Furniture collection
export type FurnType = 'chair' | 'table' | 'sofa' | 'other';
export type MaterialType = 'wood' | 'steel' | 'glass' | 'plastic';

type Vector3 = [number, number, number];

export type Furniture = {
	name: string;
	description: string;
	furnType: FurnType;
	materialType: MaterialType;
	priceDollars: number;
	imageURL: string;
	modelURL: string;
	scale: Vector3;
	position: Vector3;
	rotation: Vector3;
};

export const furnituresCollection = collection(
	db,
	'furnitures'
) as CollectionReference<Furniture>;

export const furnitureDocument = (id: string) =>
	doc(db, 'furnitures', id) as DocumentReference<Furniture>;

// Orders collection
export type Order = {
	country: string;
	city: string;
	street: string;
	streetNumber: number;
	furnitureId: string;
	userEmail: string;
	dateCreated: Date;
};

export const ordersCollection = collection(
	db,
	'orders'
) as CollectionReference<Order>;

export const orderDocument = (id: string) =>
	doc(db, 'orders', id) as DocumentReference<Order>;
