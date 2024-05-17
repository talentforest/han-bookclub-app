import { IDocument } from 'data/documentsAtom';
import { FiChevronRight, FiExternalLink } from 'react-icons/fi';
import { ReactNode, useState } from 'react';
import { cutLetter } from 'util/index';
import PostHeader from '../molecules/PostHeader';
import BookThumbnail from '../atoms/BookThumbnail';
import Modal from '../atoms/Modal';
import UserName from 'components/atoms/UserName';
import device from 'theme/mediaQueries';
import styled from 'styled-components';

interface Props {
  recommendedBookDoc: IDocument;
  collName: string;
  children?: ReactNode;
}

export default function PostRecommendedBookBox({
  recommendedBookDoc,
  collName,
  children,
}: Props) {
  const [openModal, setOpenModal] = useState(false);

  const { text, creatorId, recommendedBook } = recommendedBookDoc;

  const { title, thumbnail, authors, url } = recommendedBook || {};

  const onBookThumbnailClick = () => setOpenModal(true);

  return (
    recommendedBook && (
      <>
        <RecommendedBookItem>
          <button
            type='button'
            onClick={onBookThumbnailClick}
            className='bookimg'
          >
            <BookThumbnail title={title} thumbnail={thumbnail} />
            <FiChevronRight size={20} />
          </button>

          <h4 className='title'>{cutLetter(title, 7)}</h4>
          <UserName userId={creatorId} fontSize={14} />
        </RecommendedBookItem>

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
                <BookThumbnail title={title} thumbnail={thumbnail} />
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

              {children}
            </PostBox>
          </Modal>
        )}
      </>
    )
  );
}

const PostBox = styled.article`
  margin-top: 5px;
  gap: 5px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  scroll-behavior: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PostContentBox = styled.div`
  gap: 10px;
  margin: 5px 0 10px;
  > img {
    float: left;
    height: 96px;
    margin-right: 15px;
  }
  .no_img_box {
    float: left;
    height: 96px;
    margin-right: 15px;
  }
  @media ${device.tablet} {
  }
`;

const RecommendBookBox = styled.div`
  position: relative;
  width: 100%;
  > div {
    border-bottom: 2px dotted #ddd;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 8px;
    > span {
      line-height: 1.2;
      padding-top: 4px;
      font-size: 14px;
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

const RecommendedBookItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  margin-top: 30px;
  width: 120px;
  height: 140px;
  background-color: #fff;
  padding: 5px 3px 7px;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  .bookimg {
    position: absolute;
    height: 100px;
    top: -25px;
    svg {
      position: absolute;
      right: -20px;
      top: 50px;

      stroke: ${({ theme }) => theme.text.gray2};
    }
  }
  .title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    font-size: 15px;
    color: ${({ theme }) => theme.text.gray2};
    line-height: 1;
    margin: 3px 0 0 6px;
  }
  @media ${device.tablet} {
    width: 125px;
    height: 145px;
    gap: 4px;
    .bookimg {
      height: 110px;
    }
    .title {
      margin-bottom: 5px;
      font-size: 15px;
      color: #888;
    }
  }
`;
