// Este codigo te lo proporcionara Firebase cuando crees una nuevo proyecto.
import {initializeApp} from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
    apiKey: "**********************************",
    authDomain: "*****************************",
    projectId: "************************",
    storageBucket: "***************************",
    messagingSenderId: "************************",
    appId: "**********************************",
    measurementId: "*********************"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export {auth};