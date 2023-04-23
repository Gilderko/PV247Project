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
	query,
	Timestamp,
	where
} from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyBSpUwyp8gMJc0cJsni6Cz_5JL-PR-ibtg',
	authDomain: 'pv247projectfurniture.firebaseapp.com',
	projectId: 'pv247projectfurniture',
	storageBucket: 'pv247projectfurniture.appspot.com',
	messagingSenderId: '252845897373',
	appId: '1:252845897373:web:7868c95cf7ea9f1e838674'
};

// Initialize Firebase
const app = initializeApp(
	// Done: Add project config from https://console.firebase.google.com/u/0/project/<<porjectId>>/settings/general/web
	firebaseConfig
);

const storage = getStorage(app);

export const userProfilePhotos = ref(storage, 'userProfilePhotos');

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
const db = getFirestore(app);

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
	email: string;
	firstName: string;
	lastName: string;
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
export const furnitureTypes = ['chair', 'table', 'sofa', 'other'] as const;
export type FurnType = (typeof furnitureTypes)[number];

export const materialTypes = ['wood', 'steel', 'glass', 'plastic'] as const;
export type MaterialType = (typeof materialTypes)[number];

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
	imagesDetail: string[];
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
	dateCreated: Timestamp;
};

export const ordersCollection = collection(
	db,
	'orders'
) as CollectionReference<Order>;

export const orderDocument = (id: string) =>
	doc(db, 'orders', id) as DocumentReference<Order>;

export const getOrdersByUserEmail = (userEmail: string) =>
	query(ordersCollection, where('userEmail', '==', userEmail));
