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
    <NoThumbnailBox className='no_img_box'>
      <FiBook fontSize={25} stroke='#aaa' />
    </NoThumbnailBox>
  );
}

const ThumnailImg = styled.img`
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 0.68/1;
  max-width: 100px;
  height: 100%;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.container.default};
  @media ${device.tablet} {
    max-width: 140px;
  }
`;

const NoThumbnailBox = styled.div`
  aspect-ratio: 0.68/1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: #f1f1f1;
  border-radius: 8px;
`;
