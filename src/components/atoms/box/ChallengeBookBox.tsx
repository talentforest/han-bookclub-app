import { cutLetter, percentage } from 'util/index';
import { IChallenge } from 'data/challengeAtom';
import { useLocation } from 'react-router-dom';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import { FaRunning } from 'react-icons/fa';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import BookThumbnail from '../BookThumbnailImg';
import UserNameBox from 'components/organisms/UserNameBox';
import ChallengeEditModal from 'components/organisms/modal/ChallengeEditModal';
import styled from 'styled-components';
import { deleteDoc, doc } from 'firebase/firestore';
import { dbService } from 'fbase';
import device from 'theme/mediaQueries';

interface Props {
  challenge: IChallenge;
}

export default function ChallengeBookBox({ challenge }: Props) {
  const currentUser = useRecoilValue(currentUserState);
  const [openModal, setOpenModal] = useState(false);
  const { creatorId, books, wholePage, currentPage, id } = challenge;

  const { pathname } = useLocation();

  const { title, thumbnail, authors, publisher } = books[0];

  const percentNum = percentage(currentPage, wholePage);

  const onModalClick = () => setOpenModal((prev) => !prev);

  const docRef = doc(dbService, 'Challenge', id);

  const onDeleteClick = async () => {
    const confirm = window.confirm('정말로 삭제하시겠습니까?');
    if (!confirm) return;
    await deleteDoc(docRef);
  };

  return (
    <>
      <Item>
        <BookBox>
          {pathname === '/challenge' && currentUser.uid === creatorId && (
            <BtnBox>
              <button type='button' onClick={onModalClick}>
                <FiEdit3 fontSize={14} />
              </button>

              <button type='button' onClick={onDeleteClick}>
                <FiTrash2 fontSize={14} />
              </button>
            </BtnBox>
          )}

          <BookThumbnail title={title} thumbnail={thumbnail} />
          <div className='info'>
            <UserNameBox creatorId={creatorId} fontSize={15} />

            <h1>{cutLetter(title, 40)}</h1>

            <div>
              <span>
                {authors[0]}
                {authors.length !== 1 && `(외 ${authors.length - 1}명)`}
              </span>
              {publisher && <span> ・ {publisher}</span>}
            </div>
          </div>
        </BookBox>

        <Position $width={percentNum}>
          <div className='pages'>
            <span>
              {currentPage}p / {wholePage}p
            </span>
            <span> ({percentNum.toFixed(0)}%)</span>
          </div>
          <div className='progress-bar'>
            <FaRunning fontSize={14} />
          </div>
        </Position>
      </Item>

      {openModal && (
        <ChallengeEditModal onModalClose={onModalClick} challenge={challenge} />
      )}
    </>
  );
}

const Item = styled.li`
  position: relative;
  border-radius: 10px;
  background-color: #fff;
  padding: 10px 12px 8px;
  height: 130px;
  margin-top: 24px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BookBox = styled.div`
  flex: 1;
  > img {
    height: 100px;
    position: absolute;
    top: -12px;
  }
  > .info {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    margin-left: 85px;
    flex: 1;
    height: 100%;

    h1 {
      padding-bottom: 2px;
      display: flex;
      align-items: flex-end;
      flex: 1;
      font-size: 16px;
      line-height: 1.3;
    }
    > div {
      > span {
        line-height: 1;
        font-size: 15px;
        color: #888;
      }
    }
  }
`;

const BtnBox = styled.div`
  display: flex;
  position: absolute;
  right: 14px;
  top: 4px;
  gap: 10px;
  button {
    padding: 4px;
  }
  svg {
    font-size: 14px;
    stroke: ${({ theme }) => theme.text.gray2};
  }
`;

const Position = styled.div<{ $width: number }>`
  position: relative;
  margin-top: 25px;
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.container.blue2};
  border-radius: 20px;
  height: 12px;
  width: 100%;
  padding: 2px;
  .progress-bar {
    position: relative;
    background-color: ${({ theme }) => theme.container.green1};
    width: ${({ $width }) => `${$width}%`};
    height: 100%;
    border-radius: 30px;
    max-width: 100%;
    min-width: 0%;
  }
  .pages {
    position: absolute;
    right: 0;
    top: -21px;
    span {
      color: ${({ theme }) => theme.text.gray2};
      font-size: 13px;
    }
  }
  svg {
    position: absolute;
    right: -5px;
    bottom: 4px;
    fill: ${({ theme }) => theme.text.green};
  }
  @media ${device.tablet} {
    margin-top: 26px;
  }
`;
