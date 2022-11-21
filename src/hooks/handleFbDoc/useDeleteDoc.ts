import { dbService } from "fbase";
import { deleteDoc, doc } from "firebase/firestore";

interface PropsType {
  docId: string;
  collectionName: string;
}

const useDeleteDoc = ({ docId, collectionName }: PropsType) => {
  const docRef = doc(dbService, collectionName, `${docId}`);

  const onDeleteClick = async () => {
    await deleteDoc(docRef);
  };

  return {
    onDeleteClick,
  };
};

export default useDeleteDoc;
