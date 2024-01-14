import styled from 'styled-components';
import device from 'theme/mediaQueries';

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
      {thumbnail ? <img src={thumbnail} alt={`${title}`} /> : <></>}
      <Info $readOnly={readOnly}>
        {!readOnly && <span>이달의 책에 대한 별점 남기기</span>}
      </Info>
    </Rating>
  );
};

const Rating = styled.div<{ $readOnly: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  > img {
    box-shadow: ${(props) => props.theme.boxShadow};
    width: auto;
    height: ${(props) => (props.$readOnly ? '20px' : '30px')};
  }
  > svg {
    width: ${(props) => (props.$readOnly ? '18px' : '40px')};
    height: ${(props) => (props.$readOnly ? '18px' : '30px')};
  }
  @media ${device.tablet} {
    > img {
      height: ${(props) => (props.$readOnly ? '30px' : '40px')};
    }
    > svg {
      width: ${(props) => (props.$readOnly ? '30px' : '50px')};
      height: ${(props) => (props.$readOnly ? '30px' : '40px')};
    }
  }
`;
const Info = styled.div<{ $readOnly: boolean }>`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  margin-left: 8px;
  > span {
    color: ${(props) => props.theme.text.accent};
    padding-left: 3px;
  }
  svg {
    width: ${(props) => (props.$readOnly ? '18px' : '24px')};
    height: ${(props) => (props.$readOnly ? '18px' : '24px')};
    fill: gold;
  }
  @media ${device.tablet} {
    svg {
      width: ${(props) => (props.$readOnly ? '24px' : '28px')};
      height: ${(props) => (props.$readOnly ? '24px' : '28px')};
    }
  }
`;

export default BookRatingBox;
