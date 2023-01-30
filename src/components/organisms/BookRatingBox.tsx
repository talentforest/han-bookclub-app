import { Book } from '@mui/icons-material';
import BasicRating from 'components/atoms/BasicRating';
import styled from 'styled-components';

interface IBookRatingProps {
  thumbnail: string;
  title: string;
  rating: number;
  setRating?: (rating: number) => void;
  readOnly?: boolean;
}

const BookRatingBox = ({
  thumbnail,
  title,
  rating,
  setRating,
  readOnly,
}: IBookRatingProps) => {
  return (
    <Rating $readOnly={readOnly}>
      {thumbnail ? <img src={thumbnail} alt={`${title}`} /> : <Book />}
      <Info $readOnly={readOnly}>
        {!readOnly && <span>이달의 책에 대한 별점 남기기</span>}
        <BasicRating
          rating={rating}
          setRating={setRating}
          readOnly={readOnly}
        />
      </Info>
    </Rating>
  );
};

const Rating = styled.div<{ $readOnly: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  > img {
    width: auto;
    height: ${(props) => (props.$readOnly ? '20px' : '30px')};
  }
  > svg {
    width: ${(props) => (props.$readOnly ? '18px' : '40px')};
    height: ${(props) => (props.$readOnly ? '18px' : '30px')};
  }
`;
const Info = styled.div<{ $readOnly: boolean }>`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  > span {
    color: ${(props) => props.theme.text.accent};
    padding-left: 3px;
  }
  svg {
    width: ${(props) => (props.$readOnly ? '18px' : '24px')};
    height: ${(props) => (props.$readOnly ? '18px' : '24px')};
    fill: gold;
  }
`;

export default BookRatingBox;
