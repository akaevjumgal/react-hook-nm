import firebase from 'firebase/app'
import 'firebase/firestore'
import { FirebaseConfig } from './types/firebase'

const FIREBASE_CONFIG: FirebaseConfig = {
	apiKey: 'AIzaSyAePYR0x-7lAVtpeHJbV5sldRfBnQuPSvU',
	authDomain: 'shop-e8d6e.firebaseapp.com',
	projectId: 'shop-e8d6e',
	storageBucket: 'shop-e8d6e.appspot.com',
	messagingSenderId: '125483427106',
	appId: '1:125483427106:web:98e28c8a0c073d6abf717b'
}

const firebaseContext = firebase.initializeApp(FIREBASE_CONFIG)

export default firebaseContext
