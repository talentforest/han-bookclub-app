import { Book } from '@mui/icons-material';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface PropsType {
  thumbnail: string;
  title: string;
  smSize?: boolean;
}

const BookImgTitle = ({ thumbnail, title, smSize }: PropsType) => {
  return (
    <BookBox $smSize={smSize}>
      {thumbnail ? (
        <Thumnail src={thumbnail} $smSize={smSize} alt={`${title} thumbnail`} />
      ) : (
        <Book />
      )}
      <Title $smSize={smSize}>{title ? title : '등록된 책이 없습니다.'}</Title>
    </BookBox>
  );
};

const BookBox = styled.div<{ $smSize: boolean }>`
  display: flex;
  gap: ${(props) => (props.$smSize ? '0' : '20px')};
  flex-direction: ${(props) => (props.$smSize ? 'row' : 'column')};
  justify-content: ${(props) =>
    props.$smSize ? 'flex-start' : 'space-between'};
  align-items: center;
  svg {
    width: ${(props) => (props.$smSize ? '24px' : 'auto')};
    height: ${(props) => (props.$smSize ? '30px' : '100px')};
  }
  @media ${device.tablet} {
    svg {
      width: ${(props) => (props.$smSize ? '24px' : 'auto')};
      height: ${(props) => (props.$smSize ? '30px' : '150px')};
    }
  }
`;
const Thumnail = styled.img<{ $smSize: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  max-width: ${(props) => (props.$smSize ? '22px' : '110px')};
  height: ${(props) => (props.$smSize ? '26px' : '140px')};
  box-shadow: 2px 1px 5px rgba(0, 0, 0, 0.5);
  background-color: ${(props) => props.theme.container.default};
  @media ${device.tablet} {
    max-width: ${(props) => (props.$smSize ? '30px' : '140px')};
    height: ${(props) => (props.$smSize ? '34px' : '200px')};
  }
`;
const Title = styled.h3<{ $smSize: boolean }>`
  text-align: center;
  font-size: ${(props) => (props.$smSize ? '12px' : '16px')};
  margin-left: ${(props) => (props.$smSize ? '8px' : '0')};
  font-weight: 700;
`;

export default BookImgTitle;
