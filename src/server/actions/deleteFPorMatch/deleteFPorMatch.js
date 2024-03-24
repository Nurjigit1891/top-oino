import { deleteDoc, doc } from "firebase/firestore";
import db from "../../firebase/firebase-config";

export const deleteDocument = async (documentId, type) => {
  try {
    // Проверяем тип
    if (type === "matches") {
      // Если тип - матч, удаляем документ из коллекции "matches"
      await deleteDoc(doc(db, "matches", documentId));
      console.log("Match deleted successfully.");
    } else if (type === "free_players") {
      // Если тип - свободные игроки, удаляем документ из коллекции "freePlayers"
      await deleteDoc(doc(db, "free_players", documentId));
      console.log("The free player has been successfully removed.");
    } else {
      console.error("Unknown type to delete:", type);
    }
  } catch (error) {
    console.error("error of delete document:", error);
  }
};
