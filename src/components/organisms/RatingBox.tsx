import BookThumbnailImg from 'components/atoms/BookThumbnailImg';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface IBookRatingProps {
  thumbnail: string;
  title: string;
  rating: number;
  setRating?: (rating: number) => void;
  readOnly?: boolean;
}

const RatingBox = ({
  thumbnail,
  title,
  rating,
  setRating,
  readOnly,
}: IBookRatingProps) => {
  return (
    <Box $readOnly={readOnly}>
      {thumbnail && <BookThumbnailImg title={title} thumbnail={thumbnail} />}

      <Info $readOnly={readOnly}>
        {!readOnly && <span>이달의 책에 대한 별점</span>}
      </Info>
    </Box>
  );
};

const Box = styled.div<{ $readOnly: boolean }>`
  display: flex;
  height: 38px;
  justify-content: start;
  align-items: start;
  flex: 1;
  > img {
    border-radius: 2px;
  }
  @media ${device.tablet} {
  }
`;

const Info = styled.div<{ $readOnly: boolean }>`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  margin-left: 8px;
  > span {
    color: ${({ theme }) => theme.text.blue3};
    padding-left: 3px;
    font-size: 14px;
  }
  svg {
    width: ${({ $readOnly }) => ($readOnly ? '18px' : '24px')};
    height: ${({ $readOnly }) => ($readOnly ? '18px' : '24px')};
    fill: gold;
  }
  @media ${device.tablet} {
    svg {
      width: ${({ $readOnly }) => ($readOnly ? '24px' : '28px')};
      height: ${({ $readOnly }) => ($readOnly ? '24px' : '28px')};
    }
  }
`;

export default RatingBox;
