import { getDocument } from 'api/getFbDoc';
import { useEffect, useState } from 'react';
import { HiMiniArrowUpRight } from 'react-icons/hi2';
import { cutLetter } from 'util/index';
import styled from 'styled-components';
import BookThumbnailImg from '../BookThumbnailImg';
import UserNameBox from 'components/organisms/UserNameBox';
import device from 'theme/mediaQueries';

interface Props {
  docIds: { docId: string; monthId: string };
}

interface RecommendedBook {
  createdAt: number;
  creatorId: string;
  id: string;
  likeUsers: string[];
  likes: number;
  recommendedBook: {
    authors: string[];
    thumbnail: string;
    title: string;
    url: string;
  };
  text: string;
  thumbnail: string;
  title: string;
}

const initialValue = {
  createdAt: 0,
  creatorId: '',
  id: '',
  likeUsers: [''],
  likes: 0,
  recommendedBook: {
    authors: [''],
    thumbnail: '',
    title: '',
    url: '',
  },
  text: '',
  thumbnail: '',
  title: '',
};

export default function RecommendedBookBox({ docIds }: Props) {
  const [book, setBook] = useState<RecommendedBook>(initialValue);

  const { docId, monthId } = docIds;

  const year = monthId.slice(0, 4);

  useEffect(() => {
    getDocument(
      `BookClub-${year}/${monthId}/RecommendedBooks/`,
      docId,
      setBook
    );
  }, []);

  const {
    recommendedBook: { title, thumbnail, url },
    creatorId,
  } = book;

  return (
    <RecommendedBookItem>
      <a href={url} target='_blank' rel='noreferrer'>
        <BookThumbnailImg title={title} thumbnail={thumbnail} />
        <div className='title'>
          <h4>{cutLetter(title, 7)}</h4>
          <HiMiniArrowUpRight fill='#aaa' fontSize={13} />
        </div>
      </a>

      <div className='username'>
        <UserNameBox creatorId={creatorId} />
      </div>
    </RecommendedBookItem>
  );
}

export const RecommendedBookItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  gap: 8px;
  width: 110px;
  height: 130px;
  background-color: #fff;
  padding: 5px 3px;
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.boxShadow};
  img {
    position: absolute;
    height: 100px;
    top: 0;
  }
  h4 {
    font-size: 13px;
    color: #888;
  }
  > a {
    display: flex;
    justify-content: center;
    .title {
      width: 100%;
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
    width: 115px;
    height: 145px;
    gap: 4px;
    img {
      height: 110px;
    }
    h4 {
      font-size: 14px;
      color: #888;
    }
  }
`;
