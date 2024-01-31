import { useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { ISchedule } from 'data/bookClubAtom';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import NameTag from '../atoms/NameTag';
import MeetingInfoModal from 'components/organisms/modal/MeetingInfoModal';

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
      <Box>
        <Header>
          <h2>{labelOnTop}</h2>
        </Header>

        <ContentBox>
          {labelOnTop === '이달의 발제자' ? (
            (content as string[])?.map((host) => (
              <NameTag key={host} name={host} />
            ))
          ) : (
            <span className={!content ? 'no_content' : ''}>
              {labelOnTop} 정하기
            </span>
          )}

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
    width: 77px;
    font-size: 15px;
    word-spacing: -1px;
    text-align: center;
    line-height: 1.5;
  }
  .no_content {
    font-size: 15px;
    line-height: 1.4;
    color: #aaa;
    width: 60px;
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
