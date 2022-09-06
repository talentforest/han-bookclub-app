import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

interface PropsType {
  docId: string;
  newText: string;
  setNewText: (newText: string) => void;
  collectionName: string;
  setEditing: (toggle: boolean) => void;
}

const useEditDeleteDoc = ({
  docId,
  newText,
  setNewText,
  collectionName,
  setEditing,
}: PropsType) => {
  const [showingGuide, setShowingGuide] = useState(false);
  const docRef = doc(dbService, collectionName, `${docId}`);

  const onNewTextSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newText === "") {
      return guideShouldNotBlank();
    }
    setEditing(false);
    await updateDoc(docRef, { text: newText });
  };

  function guideShouldNotBlank() {
    setTimeout(() => {
      setShowingGuide((toggle) => !toggle);
    }, 1000);
    setShowingGuide((toggle) => !toggle);

    setEditing(true);
  }

  const onDeleteClick = async () => {
    await deleteDoc(docRef);
  };

  const onNewTextChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setNewText(event.currentTarget.value);
  };

  return {
    showingGuide,
    onNewTextSubmit,
    onDeleteClick,
    onNewTextChange,
  };
};

export default useEditDeleteDoc;
