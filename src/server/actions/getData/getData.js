import {collection, getDocs} from 'firebase/firestore'; 
import db from '../../firebase/firebase-config' // API KEYs KEEPER

const getDataFromFireBase = async () => {

    // we're  getting all the documents in a collection called "products"
    try {
        const matchCollection = collection(db, "matches");  //the path to FIREBASE

        // getting data from FireBase use matchCollection as path
        const matchesSnapshot = await getDocs(matchCollection);

        // spread operator 
        const matchesData = matchesSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        return matchesData; 
    }
    catch(err){
        console.log('Error getting documents', err);
    }
}

export default getDataFromFireBase