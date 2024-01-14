import useHandleSchedule from 'hooks/useHandleSchedule';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import Modal from '../Modal';
import BoxLabeledInput from '../inputs/BoxLabeledInput';
import SquareTag from '../SquareTag';
import NameTag from '../NameTag';
import { FiEdit3 } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import { ISchedule } from 'data/documentsAtom';
import { getDocument } from 'api/getFbDoc';
import {
  MEETING_PLACE,
  TAG_LIST,
  getLocaleDateTime,
  thisMonth,
} from 'util/index';
import { useRecoilValue } from 'recoil';
import { fieldHostDocState } from 'data/bookFieldHostAtom';

interface Props {
  header: '이달의 발제자' | '모임 시간' | '모임 장소';
  meeting?: ISchedule;
}

export default function HeaderBox({ header, meeting }: Props) {
  const [showTagList, setShowTagList] = useState(false);
  const [placeDoc, setPlaceDoc] = useState({ id: '', place: [] });
  const bookFieldHostDoc = useRecoilValue(fieldHostDocState);

  const placeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getDocument(TAG_LIST, MEETING_PLACE, setPlaceDoc);
  }, []);

  const {
    place,
    setPlace,
    time,
    setTime,
    isEditing,
    onTimeSubmit,
    onPlaceSubmit,
    onTagClick,
    onEditClick,
  } = useHandleSchedule(meeting);

  const onFocus = () => setShowTagList(true);
  const onBlur = () => setShowTagList(false);

  const thisMonthHosts = bookFieldHostDoc.info?.find(
    ({ month }) => month === thisMonth
  ).hosts;

  return (
    <Box>
      <h2>{header}</h2>

      <InfoBox>
        {header === '이달의 발제자' &&
          thisMonthHosts?.map((host) => <NameTag key={host} name={host} />)}

        {header === '모임 시간' && (
          <p className={meeting.time === 0 ? 'no_info' : ''}>
            {getLocaleDateTime(new Date(meeting.time)) ||
              `정해진 모임 시간이 없어요.`}
          </p>
        )}

        {header === '모임 장소' && (
          <p className={!meeting.place ? 'no_info' : ''}>
            {meeting.place || `정해진 모임 장소가 없어요.`}
          </p>
        )}

        {header !== '이달의 발제자' && <FiEdit3Btn onClick={onEditClick} />}
      </InfoBox>

      {isEditing && header === '모임 시간' && (
        <Modal title='모임 시간' onModalToggleClick={onEditClick}>
          <form onSubmit={onTimeSubmit}>
            <BoxLabeledInput
              label='모임 시간'
              value={time}
              setValue={setTime}
              onEditClick={onEditClick}
            />
            <SubmitBtn type='submit' value='설정하기' />
          </form>
        </Modal>
      )}

      {isEditing && header === '모임 장소' && (
        <Modal title='모임 장소' onModalToggleClick={onEditClick}>
          <form onSubmit={onPlaceSubmit}>
            <BoxLabeledInput
              label='모임 장소'
              value={place}
              setValue={setPlace}
              placeInputRef={placeInputRef}
              onFocus={onFocus}
              onBlur={onBlur}
              onEditClick={onEditClick}
            />
            <TagListBox $height={showTagList ? 100 : 0}>
              <span>추천장소</span>
              <TagList>
                {placeDoc.place.slice(0, 4).map((place) => (
                  <SquareTag
                    key={place}
                    name={place}
                    onClick={() => onTagClick(place)}
                  />
                ))}
              </TagList>
            </TagListBox>

            <SubmitBtn type='submit' value='설정하기' />
          </form>
        </Modal>
      )}
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 10px;
  flex: 1;

  > h2 {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    display: flex;
    justify-content: center;
    padding: 12px 0px;
    font-size: 15px;
    background-color: #eaeaea;
    color: #888;
  }

  @media ${device.tablet} {
    flex-direction: row;
    justify-content: space-evenly;
    gap: 15px;
    padding: 30px 0px;
  }
`;

const InfoBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 80px;
  align-items: center;
  justify-content: center;
  padding: 8px 4px 15px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  p {
    width: 90px;
    font-size: 16px;
    word-spacing: -1px;
    text-align: center;
    line-height: 24px;
  }
  .no_info {
    color: #aaa;
  }
  > div {
    border: 1px solid #eaeaea;
    width: 94%;
  }
`;

const FiEdit3Btn = styled(FiEdit3)`
  position: absolute;
  right: 4px;
  bottom: 2px;
  padding: 6px;
  width: 25px;
  height: 25px;
  stroke: #aaa;
`;

const TagListBox = styled.div<{ $height: number }>`
  height: ${(props) => `${props.$height}px`};
  transition: height 0.5s ease;
  overflow: hidden;
  margin-top: 12px;
  > span {
    font-size: 15px;
    color: #aaa;
  }
`;

const TagList = styled.ul`
  margin-top: 6px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const SubmitBtn = styled.input`
  border: 1px solid #eaeaea;
  width: 100%;
  margin-top: 20px;
  border-radius: 10px;
  padding: 12px 10px 10px;
  font-size: 16px;
  background-color: ${(props) => props.theme.container.blue};
  color: #fff;
`;
