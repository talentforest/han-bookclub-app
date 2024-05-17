import { useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { ISchedule } from 'data/bookClubAtom';
import { getLocaleDate } from 'util/index';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import MeetingInfoModal from 'components/organisms/modal/MeetingInfoModal';
import UserName from 'components/atoms/UserName';
import ShareBtn from 'components/atoms/button/ShareBtn';
import { useLocation } from 'react-router-dom';

interface Props {
  labelOnTop: '이달의 발제자' | '모임 시간' | '모임 장소';
  content?: string[] | string | number;
  meeting?: ISchedule;
  editable?: boolean;
}

export default function LabelOnTopBox({
  labelOnTop,
  content,
  meeting: { place, time },
  editable,
}: Props) {
  const [openModal, setOpenModal] = useState(false);

  const onEditClick = () => setOpenModal((prev) => !prev);

  const { pathname } = useLocation();

  const timeBox = labelOnTop === '모임 시간';

  return (
    <>
      <Box className={timeBox ? 'time' : 'place'}>
        <Header>
          <h2>{labelOnTop}</h2>

          {timeBox && pathname === '/bookclub' && place && time && (
            <ShareBtn
              place={place}
              time={getLocaleDate(time)}
              title='✨이번달의 모임일정을 공지합니다~'
              description={`이번 모임은 🏢${place}에서 🕰${getLocaleDate(
                time
              )}에 만나요!`}
              path='bookclub'
            />
          )}
        </Header>

        <ContentBox>
          {!content && <span className='no_content'>정보가 아직 없어요</span>}

          {content &&
            (labelOnTop === '이달의 발제자' ? (
              (content as string[])?.map((host) => (
                <UserName key={host} userId={host} tag />
              ))
            ) : (
              <span>{content}</span>
            ))}
        </ContentBox>

        {editable && <FiEdit3 onClick={onEditClick} stroke='#aaa' size={15} />}
      </Box>

      {openModal && (
        <MeetingInfoModal
          title={labelOnTop}
          meeting={{ time, place }}
          setIsEditing={setOpenModal}
        />
      )}
    </>
  );
}

const Box = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.container.default};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 10px;
  > svg {
    position: absolute;
    bottom: 6px;
    right: 8px;
  }
  @media ${device.tablet} {
    grid-row: 1;
    &.time {
      grid-column: 4 / span 1;
    }
    &.place {
      grid-column: 3 / span 1;
    }
  }
`;

const Header = styled.div`
  position: relative;
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
  .share-btn {
    position: absolute;
    top: 10px;
    right: 8px;
  }
`;

const ContentBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 80px;
  align-items: center;
  justify-content: center;
  padding: 8px 4px 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
  > span {
    width: 84px;
    font-size: 15px;
    text-align: center;
  }
  .no_content {
    width: 90%;
    font-size: 15px;
    line-height: 1.4;
    color: #aaa;
  }
  > div {
    border: 1px solid #eaeaea;
    width: 94%;
  }
  @media ${device.tablet} {
    > span {
      font-size: 16px;
    }
  }
`;
