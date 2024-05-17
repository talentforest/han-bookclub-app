import { ReactNode } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { IBookVoteItem } from 'data/voteAtom';
import { cutLetter } from 'util/index';
import { useLocation } from 'react-router-dom';
import BookThumbnail from '../atoms/BookThumbnail';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface Props {
  voteItem: IBookVoteItem;
  selected?: boolean;
  children?: ReactNode;
}

export default function VoteBookItem({ voteItem, children, selected }: Props) {
  const {
    book: { title, thumbnail, url },
  } = voteItem;

  const { pathname } = useLocation();

  return (
    <Box $selected={selected}>
      {title === '' ? (
        <></>
      ) : (
        <BookBox>
          {url && pathname !== '/vote' && (
            <a
              className='external-link'
              href={url}
              target='_blank'
              rel='noreferrer'
            >
              <FiExternalLink />
            </a>
          )}
          <BookThumbnail thumbnail={thumbnail} title={title} />
          <span>《{cutLetter(title, 16)}》</span>
        </BookBox>
      )}

      {children}
    </Box>
  );
}

const Box = styled.li<{ $selected: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border: 2px solid
    ${({ theme, $selected }) =>
      $selected ? theme.container.purple2 : theme.container.lightGray};
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.container.default};
  border-radius: 15px;
  .delete-btn {
    position: absolute;
    top: -5px;
    right: 0;
    svg {
      stroke: ${({ theme }) => theme.text.red};
      font-size: 24px;
    }
  }
  .empty-box {
    aspect-ratio: 0.75 / 1;
    width: 100%;
    background-color: ${({ theme }) => theme.container.default};
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
    span {
      margin-top: 8px;
      font-size: 13px;
      color: ${({ theme }) => theme.text.gray2};
    }
    svg {
      stroke: ${({ theme }) => theme.text.gray2};
    }
  }
`;

const BookBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 14px 10px 10px 10px;
  > img {
    height: 120px;
  }
  > span {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 1.4;
    text-align: center;
    margin-top: 5px;
    color: ${({ theme }) => theme.text.gray3};
  }

  .external-link {
    position: absolute;
    width: 28px;
    height: 28px;
    top: 3px;
    right: 3px;
    padding: 5px 3px 3px 4px;
    svg {
      font-size: 16px;
      stroke: ${({ theme }) => theme.container.blue3};
    }
  }
  @media ${device.tablet} {
    > span {
      margin-top: 12px;
      font-size: 15px;
    }
  }
`;
