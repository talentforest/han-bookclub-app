import { QuestionMark } from '@mui/icons-material';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

const clubBookImgs = [
  {
    src: 'Event.png',
    alt: 'Event',
  },
  {
    src: 'https://image.aladin.co.kr/product/30519/97/cover500/k022830494_1.jpg',
    alt: '2월의 책 복지의 문법',
  },
  { src: '', alt: '3월의 책' },
  { src: '', alt: '4월의 책' },
  { src: '', alt: '5월의 책' },
  { src: '', alt: '6월의 책' },
  { src: '', alt: '7월의 책' },
  { src: '', alt: '8월의 책' },
  { src: '', alt: '9월의 책' },
  { src: '', alt: '10월의 책' },
  { src: '', alt: '11월의 책' },
  { src: '', alt: '12월의 책' },
];

const BookLogoBox = () => {
  return (
    <Box>
      <Col>
        {clubBookImgs.slice(0, 5).map((bookImg) =>
          bookImg.src !== '' ? (
            <Hexagon key={bookImg.alt} src={bookImg.src} alt={bookImg.alt} />
          ) : (
            <Hexagon as='div' key={bookImg.alt}>
              <QuestionMark />
            </Hexagon>
          )
        )}
      </Col>
      <Col $flex>
        {clubBookImgs.slice(5, 7).map((bookImg) =>
          bookImg.src !== '' ? (
            <Hexagon key={bookImg.alt} src={bookImg.src} alt={bookImg.alt} />
          ) : (
            <Hexagon as='div' key={bookImg.alt}>
              <QuestionMark />
            </Hexagon>
          )
        )}
      </Col>
      <Col>
        {clubBookImgs.slice(7, 12).map((bookImg) =>
          bookImg.src !== '' ? (
            <Hexagon key={bookImg.alt} src={bookImg.src} alt={bookImg.alt} />
          ) : (
            <Hexagon as='div' key={bookImg.alt}>
              <QuestionMark />
            </Hexagon>
          )
        )}
      </Col>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  margin: 20px auto;
  filter: drop-shadow(4px 2px 3px rgba(50, 50, 0, 0.5));
  @media ${device.tablet} {
    margin: 50px auto;
  }
`;
const Col = styled.div<{ $flex?: boolean }>`
  display: ${(props) => (props.$flex ? 'flex' : 'block')};
`;
const Hexagon = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 40px;
  background-color: #fff;
  object-fit: cover;
  object-position: top;
  box-shadow: 4px 0px 3px rgba(0, 0, 0, 0.8);
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  svg {
    width: 12px;
    height: 12px;
  }
  @media ${device.tablet} {
    width: 70px;
    height: 65px;
  }
`;

export default BookLogoBox;
