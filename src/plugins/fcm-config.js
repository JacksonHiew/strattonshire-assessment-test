import firebaseapp from './firebase-config';
import { getMessaging } from "firebase/messaging";

// Initialize Cloud Firestore and get a reference to the service
const messaging = getMessaging(firebaseapp);

export default messaging;