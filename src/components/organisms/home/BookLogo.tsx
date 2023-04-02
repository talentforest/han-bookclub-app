import { QuestionMark } from '@mui/icons-material';
import { getCollection } from 'api/getFbDoc';
import { clubInfoByYearState } from 'data/documentsAtom';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { thisYear } from 'util/index';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

const BookLogoBox = () => {
  const [clubInfoDocs, setClubInfoDocs] = useRecoilState(clubInfoByYearState);

  useEffect(() => {
    getCollection(`BookClub-${thisYear}`, setClubInfoDocs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clubBookImgs = clubInfoDocs.map((monthDoc) => {
    const src = monthDoc.book.thumbnail ? monthDoc.book.thumbnail : 'Event.png';
    return { src, alt: `${monthDoc.id.slice(-1)}월의 책` };
  });

  const yearClubBookImgs = [
    ...Array.from({ length: 12 - clubBookImgs.length }, (_, index) => {
      return { src: '', alt: `${index + 1 + clubBookImgs.length}월의 책` };
    }),
    ...clubBookImgs,
  ];

  return (
    <Box>
      <Col>
        {yearClubBookImgs.slice(7, 12).map((bookImg) =>
          bookImg?.src !== '' ? (
            <Hexagon key={bookImg.alt} src={bookImg.src} alt={bookImg.alt} />
          ) : (
            <Hexagon as='div' key={bookImg.alt}>
              <QuestionMark />
            </Hexagon>
          )
        )}
      </Col>
      <Col $flex>
        {yearClubBookImgs.slice(5, 7).map((bookImg) =>
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
        {yearClubBookImgs.slice(0, 5).map((bookImg) =>
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
  box-shadow: ${(props) => props.theme.boxShadow};
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
