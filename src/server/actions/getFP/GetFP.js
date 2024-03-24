import {collection, getDocs} from 'firebase/firestore' 
import db from '../../firebase/firebase-config';

const getFreePlayersFromFB = async () => {

    try {
        const freePlayersCollection = collection(db, "free_players");
        const fpSnapShot = await getDocs(freePlayersCollection);

        const fpData = fpSnapShot.docs.map((doc) => ({id: doc.id , ...doc.data()}));
        return fpData;

    } catch (error) {
        console.log("error getting documents" , error)
    }
}

export default getFreePlayersFromFB