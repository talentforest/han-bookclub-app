import { IDocument } from 'data/documentsAtom';
import { authService, dbService } from 'fbase';
import { addDoc, collection } from 'firebase/firestore';
import useAlertAskJoin from '../useAlertAskJoin';

interface PropsType {
  text: string;
  setText: (text: string) => void;
  collectionName: string;
  docData: IDocument;
}

const useAddDoc = ({ text, setText, collectionName, docData }: PropsType) => {
  const { alertAskJoinMember } = useAlertAskJoin('write');
  const docRef = collection(dbService, collectionName);

  const onAddDocSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (text.length === 0) return;
      await addDoc(docRef, docData);
    } catch (error) {
      console.error('Error adding document:', error);
    }
    setText('');
  };

  function onChange(event: React.FormEvent<HTMLTextAreaElement>) {
    if (authService.currentUser.isAnonymous) return alertAskJoinMember();
    setText(event.currentTarget.value);
  }

  return { onAddDocSubmit, onChange };
};

export default useAddDoc;
