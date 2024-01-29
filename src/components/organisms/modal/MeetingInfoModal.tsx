import { ISchedule } from 'data/bookClubAtom';
import { getDocument } from 'api/getFbDoc';
import { MEETING_PLACE, TAG_LIST } from 'constants/index';
import { useEffect, useRef, useState } from 'react';
import Modal from 'components/atoms/Modal';
import SquareBtn from 'components/atoms/button/SquareBtn';
import BoxLabeledInput from 'components/atoms/input/BoxLabeledInput';
import styled from 'styled-components';
import useHandleSchedule from 'hooks/useHandleSchedule';

interface Props {
  title: string;
  meeting: ISchedule;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MeetingInfoModal({
  title,
  meeting,
  setIsEditing,
}: Props) {
  const [placeDoc, setPlaceDoc] = useState({ id: '', place: [] });
  const [showTagList, setShowTagList] = useState(false);

  const placeInputRef = useRef<HTMLInputElement>(null);

  const {
    place,
    setPlace,
    time,
    setTime,
    onTimeSubmit,
    onPlaceSubmit,
    onTagClick,
    onEditClick,
  } = useHandleSchedule(meeting, setIsEditing);

  const onFocus = () => setShowTagList(true);

  const onBlur = () => setShowTagList(false);

  useEffect(() => {
    getDocument(TAG_LIST, MEETING_PLACE, setPlaceDoc);
  }, []);

  return (
    <Modal title={title} onToggleClick={onEditClick}>
      {title === '모임 시간' && (
        <Form onSubmit={onTimeSubmit}>
          <BoxLabeledInput label='모임 시간' value={time} setValue={setTime} />
          <SquareBtn type='submit' name='설정하기' />
        </Form>
      )}

      {title === '모임 장소' && (
        <Form onSubmit={onPlaceSubmit}>
          <BoxLabeledInput
            label='모임 장소'
            value={place}
            setValue={setPlace}
            placeInputRef={placeInputRef}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <TagListBox $height={showTagList ? 100 : 0}>
            <span>추천장소</span>

            <TagList>
              {placeDoc.place.slice(0, 4).map((place) => (
                <SquareBoxBtn key={place} onClick={() => onTagClick(place)}>
                  {place}
                </SquareBoxBtn>
              ))}
            </TagList>
          </TagListBox>

          <SquareBtn type='submit' name='설정하기' />
        </Form>
      )}
    </Modal>
  );
}

const TagListBox = styled.div<{ $height: number }>`
  height: ${($height) => `${$height}px`};
  transition: height 0.5s ease;
  overflow: hidden;
  margin: 12px 0 20px;
  > span {
    padding-left: 4px;
    font-size: 15px;
    color: #aaa;
  }
`;

const TagList = styled.ul`
  margin-top: 2px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const SquareBoxBtn = styled.div`
  border: 1px solid #f4fab3;
  padding: 8px 12px 6px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.container.yellow1};
  color: ${({ theme }) => theme.text.yellow};
  font-size: 14px;
`;