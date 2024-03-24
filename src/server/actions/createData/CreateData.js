import { collection, addDoc } from 'firebase/firestore'; 
import db from '../../firebase/firebase-config' // API KEYs KEEPER


// function for add match to FIREBASE

const addMatch = async (matchData) => {
  //we're trying to create a new data and send to FireBase
  try {
    const matchesCollection = collection(db, 'matches'); // the path to FIREBASE

    await addDoc(matchesCollection, matchData); // "addDoc" - a specific function add "matchData" from path "matchesCollection"
    
    console.log('Match added successfully!');
  } catch (error) { 

    // if there is an error we will print it out
    console.error('Error adding match: ', error);
  }
};


export default addMatch

