import { IWrittenDocs } from "components/bookmeeting/Subjects";
import { authService, dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import useAlertAskJoin from "./useAlertAskJoin";

interface PropsType {
  text: string;
  setText: (text: string) => void;
  collectionName: string;
  document: IWrittenDocs;
}

const useAddDoc = ({ text, setText, collectionName, document }: PropsType) => {
  const { alertAskJoin } = useAlertAskJoin();

  const onAddDocSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text === "") return;
    addDocForMemberOnly();
  };

  function addDocForMemberOnly() {
    try {
      if (authService.currentUser.isAnonymous) return alertAskJoin();
      addDocument();
    } catch (error) {
      console.error("Error adding document:", error);
    }
    setText("");
  }

  async function addDocument() {
    await addDoc(collection(dbService, collectionName), document);
  }

  async function onTextChange(event: React.FormEvent<HTMLTextAreaElement>) {
    setText(event.currentTarget.value);
  }

  return { onAddDocSubmit, onTextChange };
};

export default useAddDoc;
