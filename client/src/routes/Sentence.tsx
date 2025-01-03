import { ISentence, sentencesState } from 'data/bookAtom';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { getCollection } from 'api/getFbDoc';
import { SENTENCES2024 } from 'constants/index';
import { EmptyBox } from './BookClubHistory';
import { formatKRMarkDate } from 'util/index';
import { FiCalendar } from 'react-icons/fi';
import { SwiperSlide } from 'swiper/react';
import PostSentenceBox from 'components/organisms/PostSentenceBox';
import MobileHeader from 'layout/mobile/MobileHeader';
import Tag from 'components/atoms/Tag';
import Subtitle from 'components/atoms/Subtitle';
import SwiperContainer from 'components/molecules/SwiperContainer';
import BookThumbnail from 'components/atoms/book/BookThumbnail';
import styled from 'styled-components';
import Section from 'components/atoms/container/Section';

const swiperOptions = {
  slidesPerView: 'auto' as 'auto',
  pagination: false,
  breakpoints: {
    1024: {
      slidesPerView: 5,
    },
    800: {
      slidesPerView: 4,
    },
    500: {
      slidesPerView: 3,
    },
    320: {
      slidesPerView: 2,
    },
  },
};

export default function Sentence() {
  const [sentences, setSentences] = useRecoilState(sentencesState);

  useEffect(() => {
    if (!sentences) {
      getCollection(SENTENCES2024, setSentences);
    }
  }, []);

  const groupSentences = (by: 'title' | 'createdAt') => {
    return sentences?.reduce((accByBook: any, sentence) => {
      const key =
        by === 'createdAt'
          ? formatKRMarkDate(sentence[by], 'YYYY년 MM월 DD일')
          : sentence[by];

      return {
        ...accByBook,
        [key]: [...(accByBook[key] || []), sentence],
      };
    }, {});
  };

  const groupedByDate = groupSentences('createdAt');

  const dateKeys = Object?.keys(groupedByDate || {});

  const groupedByTitle = groupSentences('title');

  const titleKeys = Object?.keys(groupedByTitle || {});

  return (
    <>
      <MobileHeader title='공유하고 싶은 문구들' backBtn />

      <main>
        <Section title='문구가 등록된 책'>
          {titleKeys?.length !== 0 ? (
            <Container>
              <SwiperContainer options={swiperOptions}>
                {titleKeys?.map((titleKey) => (
                  <SwiperSlide key={titleKey}>
                    <BookItem>
                      <BookThumbnail
                        title={titleKey}
                        thumbnail={groupedByTitle[titleKey][0].thumbnail}
                      />
                      <span>
                        {groupedByTitle[titleKey].length}개의 문구 등록
                      </span>
                    </BookItem>
                  </SwiperSlide>
                ))}
              </SwiperContainer>
            </Container>
          ) : (
            <EmptyBox>아직 문구가 등록된 책이 없습니다.</EmptyBox>
          )}
        </Section>

        <Section>
          <Subtitle title='날짜별로 전체 문구 보기' />
          {dateKeys?.length !== 0 ? (
            dateKeys?.map((dateKey) => (
              <SentenceListByDate key={dateKey}>
                <Tag color='purple'>
                  <FiCalendar fontSize={15} />
                  <h3>{dateKey}</h3>
                </Tag>
                {groupedByDate[dateKey]?.map((sentence: ISentence) => (
                  <PostSentenceBox key={sentence.id} sentence={sentence} />
                ))}
              </SentenceListByDate>
            ))
          ) : (
            <EmptyBox>아직 공유된 문구가 없습니다.</EmptyBox>
          )}
        </Section>
      </main>
    </>
  );
}

const SentenceListByDate = styled.ul`
  margin-bottom: 40px;
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.container.default};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 10px;
  padding: 20px 5px 0 5px;
`;

const BookItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  justify-content: space-between;
  img {
    height: 100px;
    border-radius: 6px;
  }
  span {
    margin-top: 3px;
    font-size: 14px;
    color: ${({ theme }) => theme.text.gray3};
  }
`;
