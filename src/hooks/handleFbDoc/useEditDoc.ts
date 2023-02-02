import { dbService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

interface PropsType {
  docId: string;
  editedText: string;
  setEditedText: (newText: string) => void;
  setEditing: (toggle: boolean) => void;
  collName: string;
  editingRate?: number;
}

const useEditDoc = ({
  docId,
  setEditedText,
  editedText,
  editingRate,
  setEditing,
  collName,
}: PropsType) => {
  const [showingGuide, setShowingGuide] = useState(false);
  const docRef = doc(dbService, collName, `${docId}`);

  const updatedData = () => {
    if (collName.includes('Reviews')) {
      return { text: editedText, rating: editingRate };
    }
    return { text: editedText };
  };

  const onEditedSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editedText === '') {
      return guideShouldNotBlank();
    }
    setEditing(false);
    await updateDoc(docRef, updatedData());
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
