import { IDocument } from 'data/documentsAtom';
import { FiExternalLink, FiFileText } from 'react-icons/fi';
import { useState } from 'react';
import { RecommendedBookItem } from '../box/RecommendedBookBox';
import { cutLetter } from 'util/index';
import styled from 'styled-components';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import BookThumbnailImg from '../BookThumbnailImg';
import Modal from '../Modal';
import UserNameBox from 'components/organisms/UserNameBox';
import device from 'theme/mediaQueries';

interface Props {
  recommendedBookDoc: IDocument;
  collName: string;
}

export default function PostRecommendedBook({
  recommendedBookDoc,
  collName,
}: Props) {
  const [openModal, setOpenModal] = useState(false);

  const {
    text,
    creatorId,
    createdAt,
    recommendedBook: { title, thumbnail, authors, url },
  } = recommendedBookDoc;

  return (
    <>
      <BookItem as='button' type='button' onClick={() => setOpenModal(true)}>
        <div className='bookimg'>
          <BookThumbnailImg title={title} thumbnail={thumbnail} />
          <div className='title'>
            <h4>{cutLetter(title, 6)}</h4>
            <FiFileText stroke='#aaa' fontSize={13} />
          </div>
        </div>
        <div className='username'>
          <UserNameBox creatorId={creatorId} />
        </div>
      </BookItem>

      {openModal && (
        <Modal
          title='추천책 보기'
          onToggleClick={() => setOpenModal((prev) => !prev)}
        >
          <PostBox>
            <PostHeader
              collName={collName}
              post={recommendedBookDoc}
              postType='책 추천'
            />

            <PostContentBox>
              <BookThumbnailImg title={title} thumbnail={thumbnail} />
              <RecommendBookBox>
                <div>
                  <a href={url} target='_blank' rel='noreferrer'>
                    <span>{title}</span>
                    <FiExternalLink stroke='#aaa' fontSize={14} />
                  </a>

                  <span>{authors.join(', ')}</span>
                </div>

                <p dangerouslySetInnerHTML={{ __html: text }} />
              </RecommendBookBox>
            </PostContentBox>

            <PostFooter
              collName={collName}
              footerType='likes'
              post={recommendedBookDoc}
              createdAt={createdAt}
            />
          </PostBox>
        </Modal>
      )}
    </>
  );
}

const BookItem = styled(RecommendedBookItem)`
  position: relative;
  gap: 0;
  margin-top: 34px;
  width: 100%;
  height: 130px;
  > div.bookimg {
    display: flex;
    justify-content: center;
    img {
      top: -30px;
    }
    .title {
      display: flex;
      gap: 2px;
    }
  }
  .username {
    height: 20px;
    display: flex;
    align-items: end;
  }
  @media ${device.tablet} {
    gap: 2px;
    height: 140px;
  }
  @media ${device.desktop} {
    height: 150px;
  }
`;

const PostBox = styled.article`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const PostContentBox = styled.div`
  gap: 10px;
  min-height: 150px;
  > img {
    float: left;
    height: 96px;
    margin-right: 15px;
  }
  @media ${device.tablet} {
    min-height: 180px;
  }
`;

const RecommendBookBox = styled.div`
  position: relative;
  width: 100%;
  > div {
    border-bottom: 1px dotted #ddd;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 8px;
    > span {
      line-height: 1.2;
      padding-top: 4px;
      font-size: 13px;
      color: #888;
    }
    a {
      display: flex;
      align-items: center;
      color: ${({ theme }) => theme.text.blue3};
      gap: 3px;
      span {
        font-size: 16px;
      }
    }
  }
  > p {
    margin: 8px 0;
    font-size: 15px;
  }
`;
