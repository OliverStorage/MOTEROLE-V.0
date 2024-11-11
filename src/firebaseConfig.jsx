// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCgsXKsjiKQK-ujQu0meaEYBHkXcBGLlDA',
    authDomain: 'motorole-bdee3.firebaseapp.com',
    projectId: 'motorole-bdee3',
    storageBucket: 'motorole-bdee3.appspot.com',
    messagingSenderId: '360928086516',
    appId: '1:360928086516:web:bb34b9f6e30dc1748f11a1',
    measurementId: 'G-QKV84BYD93',
    databaseURL:
        'https://motorole-bdee3-default-rtdb.asia-southeast1.firebasedatabase.app',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app) // Initialize Firestore

export { app, db }
