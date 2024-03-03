import { useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { ISchedule } from 'data/bookClubAtom';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import MeetingInfoModal from 'components/organisms/modal/MeetingInfoModal';
import UserName from 'components/atoms/UserName';

interface Props {
  labelOnTop: '이달의 발제자' | '모임 시간' | '모임 장소';
  content?: string[] | string | number;
  meeting?: ISchedule;
  editable?: boolean;
}

export default function LabelOnTopBox({
  labelOnTop,
  content,
  meeting,
  editable,
}: Props) {
  const [openModal, setOpenModal] = useState(false);

  const onEditClick = () => setOpenModal((prev) => !prev);

  return (
    <>
      <Box className={labelOnTop === '모임 시간' ? 'time' : 'place'}>
        <Header>
          <h2>{labelOnTop}</h2>
        </Header>

        <ContentBox>
          {!content && <span className='no_content'>정보가 아직 없어요</span>}

          {content &&
            (labelOnTop === '이달의 발제자' ? (
              (content as string[])?.map((host) => (
                <UserName key={host} creatorId={host} tag />
              ))
            ) : (
              <span>{content}</span>
            ))}

          {editable && <FiEdit3Btn onClick={onEditClick} />}
        </ContentBox>
      </Box>

      {openModal && (
        <MeetingInfoModal
          title={labelOnTop}
          meeting={meeting}
          setIsEditing={setOpenModal}
        />
      )}
    </>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.container.default};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 10px;
  @media ${device.tablet} {
    grid-row: 1;
    &.time {
      grid-column: 3 / span 1;
    }
    &.place {
      grid-column: 4 / span 1;
    }
  }
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

const ContentBox = styled.div`
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

const FiEdit3Btn = styled(FiEdit3)`
  position: absolute;
  right: 4px;
  bottom: 2px;
  padding: 6px;
  width: 25px;
  height: 25px;
  stroke: #aaa;
`;
