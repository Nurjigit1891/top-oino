import { collection, addDoc } from 'firebase/firestore'; 
import db from '../../firebase/firebase-config' // API KEYs KEEPER


// function for add Free PLayers to Firebase
const addFreePlayer = async (dataFP) => {

    try {
  
      const collectionFP = collection(db, "free_players");
      await addDoc(collectionFP, dataFP)
      
      console.log("data free player added success");
    }catch (error) {
      console.log("error: " + error);
    }
}

export default addFreePlayer