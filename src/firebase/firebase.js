// Este codigo te lo proporcionara Firebase cuando crees una nuevo proyecto.
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
    apiKey: "******************************",
    authDomain: "*******************************",
    projectId: "*******************************",
    storageBucket: "*******************************",
    messagingSenderId: "*********",
    appId: "*********************************",
    measurementId: "*********************"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth};
