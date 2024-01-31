import { thisYear } from 'util/index';
import { FiChevronRight, FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { notionUrls } from 'constants/notionUrl';
import { SiNotion } from 'react-icons/si';
import Subtitle from 'components/atoms/Subtitle';
import GuideLine from 'components/atoms/GuideLine';
import BookFieldHostTable from 'components/organisms/BookFieldHostTable';
import VoteSlider from 'components/organisms/VoteSlider';
import styled from 'styled-components';
import RecommendedBooksByIdScrollBox from 'components/organisms/RecommendedBooksByIdScrollBox';
import ChallengeBookList from 'components/organisms/ChallengeBookList';
import ThisMonthBookClub from 'components/organisms/ThisMonthBookClub';
import MobileHeader from 'layout/mobile/MobileHeader';
import device from 'theme/mediaQueries';
import BookClubNextMonthBox from 'components/molecules/BookClubNextMonthBox';

const Home = () => {
  return (
    <>
      <MobileHeader title='독서모임 한페이지' />
      <main>
        <Section>
          <GuideLine text='매월 1일에 업데이트 됩니다' />
          <ThisMonthBookClub />
          <BookClubNextMonthBox />
        </Section>

        <Section>
          <Subtitle title={`${thisYear}년 개인별 챌린지`} />
          <ChallengeBookList />

          <SeeMoreChallengeBtn to='/challenge'>
            <span>챌린지 더보기</span>
            <FiChevronRight />
          </SeeMoreChallengeBtn>
        </Section>

        <Section>
          <Subtitle title='투표함' />
          <VoteSlider />
        </Section>

        <Section>
          <Subtitle title='한페이지 멤버들이 소개했던 책' />
          <RecommendedBooksByIdScrollBox />
        </Section>

        <Section>
          <Subtitle title={`${thisYear} 한페이지의 독서분야와 발제자`} />
          <BookFieldHostTable />
        </Section>
      </main>

      <Footer>
        <div>
          <SiNotion />
          <h4>노션 페이지</h4>
        </div>
        <ul>
          {notionUrls.map((notionUrl) => (
            <li key={notionUrl.name}>
              <a href={notionUrl.url} target='_blank' rel='noreferrer'>
                <span> {notionUrl.name}</span>
                <FiExternalLink />
              </a>
            </li>
          ))}
        </ul>
        <span>ⓒ 독서모임 한페이지 All rights reserved</span>
      </Footer>
    </>
  );
};

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 65px;
  @media ${device.tablet} {
    margin-bottom: 80px;
  }
  @media ${device.desktop} {
    margin-bottom: 80px;
  }
`;

const SeeMoreChallengeBtn = styled(Link)`
  border-radius: 10px;
  width: 100%;
  margin-top: 10px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  background-color: ${({ theme }) => theme.container.purple1};
  box-shadow: ${({ theme }) => theme.boxShadow};
  span {
    padding-top: 3px;
    color: ${({ theme }) => theme.text.purple};
  }
  svg {
    color: ${({ theme }) => theme.text.purple};
  }
`;

const Footer = styled.footer`
  padding: 15px 25px 20px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #ddd;
  > span {
    margin-top: 20px;
    color: ${({ theme }) => theme.text.gray2};
    font-size: 15px;
  }
  div {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 10px;
    h4 {
      color: ${({ theme }) => theme.text.gray2};
    }
    svg {
      fill: ${({ theme }) => theme.text.gray2};
    }
  }
  ul {
    padding-left: 20px;
    li {
      list-style: disc;
    }
  }
  a {
    display: flex;
    align-items: center;
    gap: 5px;
    span {
      line-height: 1.5;
      color: ${({ theme }) => theme.text.gray4};
    }
    svg {
      stroke: ${({ theme }) => theme.text.gray3};
      margin-bottom: 4px;
    }
    padding-bottom: 8px;
  }
`;

export default Home;
