import { FiEdit3 } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import { ISchedule } from 'data/bookClubAtom';
import { getDocument } from 'api/getFbDoc';
import { getMeetingTime, thisMonth } from 'util/index';
import { useRecoilValue } from 'recoil';
import { fieldHostDocState } from 'data/bookFieldHostAtom';
import { useLocation } from 'react-router-dom';
import { MEETING_PLACE, TAG_LIST } from 'constants/fbRouteName';
import useHandleSchedule from 'hooks/useHandleSchedule';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import Modal from './Modal';
import BoxLabeledInput from './input/BoxLabeledInput';
import SquareTag from './tag/SquareTag';
import NameTag from './tag/NameTag';
import SquareBtn from './button/SquareBtn';

interface Props {
  header: '이달의 발제자' | '모임 시간' | '모임 장소';
  meeting?: ISchedule;
}

export default function HeaderBox({ header, meeting }: Props) {
  const [showTagList, setShowTagList] = useState(false);
  const [placeDoc, setPlaceDoc] = useState({ id: '', place: [] });
  const bookFieldHostDoc = useRecoilValue(fieldHostDocState);

  const { pathname } = useLocation();

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
    ({ month }) => month === +thisMonth
  )?.hosts;

  return (
    <Box>
      <Header>
        <h2>{header}</h2>
      </Header>

      <InfoBox>
        {header === '이달의 발제자' &&
          thisMonthHosts?.map((host) => <NameTag key={host} name={host} />)}

        {header === '모임 시간' && (
          <span className={meeting.time === 0 ? 'no_info' : ''}>
            {getMeetingTime(meeting.time) || `정해진 모임 시간이 없어요.`}
          </span>
        )}

        {header === '모임 장소' && (
          <span className={!meeting.place ? 'no_info' : ''}>
            {meeting.place || `정해진 모임 장소가 없어요.`}
          </span>
        )}

        {header !== '이달의 발제자' && pathname !== '/' && (
          <FiEdit3Btn onClick={onEditClick} />
        )}
      </InfoBox>

      {isEditing && header === '모임 시간' && (
        <Modal title='모임 시간' onToggleClick={onEditClick}>
          <Form onSubmit={onTimeSubmit}>
            <BoxLabeledInput
              label='모임 시간'
              value={time}
              setValue={setTime}
            />
            <SquareBtn type='submit' name='설정하기' />
          </Form>
        </Modal>
      )}

      {isEditing && header === '모임 장소' && (
        <Modal title='모임 장소' onToggleClick={onEditClick}>
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
                  <SquareTag
                    key={place}
                    name={place}
                    onClick={() => onTagClick(place)}
                  />
                ))}
              </TagList>
            </TagListBox>

            <SquareBtn type='submit' name='설정하기' />
          </Form>
        </Modal>
      )}
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.container.default};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 10px;
  flex: 1;
`;

const Header = styled.div`
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  display: flex;
  justify-content: center;
  padding: 8px 0px;
  background-color: ${({ theme }) => theme.container.blue1};
  > h2 {
    font-size: 14px;
    color: ${({ theme }) => theme.text.gray3};
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
  > span {
    width: 77px;
    font-size: 15px;
    word-spacing: -1px;
    text-align: center;
    line-height: 1.5;
  }
  .no_info {
    color: #aaa;
  }
  > div {
    border: 1px solid #eaeaea;
    width: 94%;
  }
  @media ${device.tablet} {
    > span {
      width: 150px;
      font-size: 16px;
    }
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
