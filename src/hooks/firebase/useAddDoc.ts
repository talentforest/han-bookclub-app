import { IWrittenDocs } from "components/common/SubjectBox";
import { authService, dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import useAlertAskJoin from "../useAlertAskJoin";

interface PropsType {
  text: string;
  setText: (text: string) => void;
  collectionName: string;
  docData: IWrittenDocs;
}

const useAddDoc = ({ text, setText, collectionName, docData }: PropsType) => {
  const { alertAskJoinMember } = useAlertAskJoin();
  const docRef = collection(dbService, collectionName);

  const onAddDocSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (text.length === 0) return;
      if (authService.currentUser.isAnonymous) return alertAskJoinMember();
      await addDoc(docRef, docData);
    } catch (error) {
      console.error("Error adding document:", error);
    }
    setText("");
  };

  function onChange(event: React.FormEvent<HTMLTextAreaElement>) {
    setText(event.currentTarget.value);
  }

  return { onAddDocSubmit, onChange };
};

export default useAddDoc;
