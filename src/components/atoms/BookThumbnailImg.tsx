import { FiBook } from 'react-icons/fi';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface Props {
  title: string;
  thumbnail: string;
}

export default function BookThumbnailImg({ title, thumbnail }: Props) {
  return thumbnail ? (
    <ThumnailImg src={thumbnail} alt={`${title} 북커버 이미지`} />
  ) : (
    <FiBook />
  );
}

const ThumnailImg = styled.img`
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  max-width: 100px;
  height: 100%;
  box-shadow: ${(props) => props.theme.boxShadow};
  background-color: ${(props) => props.theme.container.default};
  @media ${device.tablet} {
    max-width: 140px;
  }
`;
