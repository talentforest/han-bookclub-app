import { dbService } from "fbase";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

interface PropsType {
  docId: string;
  editedText: string;
  setEditedText: (newText: string) => void;
  setEditing: (toggle: boolean) => void;
  collectionName: string;
}

const useEditDoc = ({
  docId,
  editedText,
  setEditedText,
  setEditing,
  collectionName,
}: PropsType) => {
  const [showingGuide, setShowingGuide] = useState(false);
  const docRef = doc(dbService, collectionName, `${docId}`);

  const onEditedSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editedText === "") {
      return guideShouldNotBlank();
    }
    setEditing(false);
    await updateDoc(docRef, { text: editedText });
  };

  function guideShouldNotBlank() {
    setTimeout(() => {
      setShowingGuide((toggle) => !toggle);
    }, 1000);
    setShowingGuide((toggle) => !toggle);
    setEditing(true);
  }

  const onEditedChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setEditedText(event.currentTarget.value);
  };

  return {
    showingGuide,
    onEditedSubmit,
    onEditedChange,
  };
};

export default useEditDoc;
