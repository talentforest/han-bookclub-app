import { IDocument } from 'data/documentsAtom';
import { FiExternalLink } from 'react-icons/fi';
import styled from 'styled-components';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import BookThumbnailImg from '../BookThumbnailImg';
import PostContent from './PostContent';

interface Props {
  recommendedBookDoc: IDocument;
  collName: string;
}

export default function PostRecommendedBook({
  recommendedBookDoc,
  collName,
}: Props) {
  const {
    text,
    createdAt,
    recommendedBook: { title, thumbnail, authors, url },
  } = recommendedBookDoc;

  return (
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

          <PostContent text={text} />
        </RecommendBookBox>
      </PostContentBox>

      <PostFooter
        collName={collName}
        footerType='likes'
        post={recommendedBookDoc}
        createdAt={createdAt}
      />
    </PostBox>
  );
}

const PostBox = styled.article`
  border-radius: 10px;
  padding: 10px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: ${(props) => props.theme.boxShadow};
`;

const PostContentBox = styled.div`
  gap: 10px;
  min-height: 130px;
  img {
    float: left;
    height: 96px;
    margin-right: 15px;
  }
`;

const RecommendBookBox = styled.div`
  position: relative;
  width: 100%;
  > div {
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 5px;

    > span {
      line-height: 1.2;
      display: block;
      font-size: 13px;
      color: #888;
    }
    a {
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.text.accent};
      padding-bottom: 5px;
      gap: 2px;
      span {
        font-size: 16px;
      }
    }
  }
  > p {
    margin: 8px 0;
    line-height: 1;
    font-size: 15px;
  }
`;
