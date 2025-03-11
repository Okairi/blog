// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDmyED7sgjIcp2hTbNc0U_qP26MNQsO6sQ',
  authDomain: 'blog-angular-e8d2b.firebaseapp.com',
  projectId: 'blog-angular-e8d2b',
  storageBucket: 'blog-angular-e8d2b.firebasestorage.app',
  messagingSenderId: '1043602017913',
  appId: '1:1043602017913:web:717928f85f07f9014ecea8',
  measurementId: 'G-HMFL89KTFM',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
