import firebaseapp from './firebase-config';
import { getFirestore } from "firebase/firestore";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseapp);

export default db;