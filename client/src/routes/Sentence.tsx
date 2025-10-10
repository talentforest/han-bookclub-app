import { useEffect } from 'react';

import { FiCalendar } from 'react-icons/fi';
import { SwiperSlide } from 'swiper/react';

import { useRecoilState } from 'recoil';

import { sentencesState } from '@/data/challengeAtom';

import { getCollection } from '@/api';

import { SENTENCES2024 } from '@/appConstants';

import { formatDate } from '@/utils';

import { ChallengeSentence } from '@/types';

import MobileHeader from '@/layout/MobileHeader';

import Tag from '@/components/common/Tag';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import Section from '@/components/common/container/Section';
import SwiperContainer from '@/components/common/container/SwiperContainer';
import PostSentenceBox from '@/components/post/PostSentenceBox';

const swiperOptions = {
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
          ? formatDate(sentence[by], 'yyyy년 MM월 dd일')
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
      <MobileHeader title="공유하고 싶은 문구들" backBtn />

      <main>
        <Section title="문구가 등록된 책">
          {titleKeys?.length !== 0 ? (
            <div>
              <SwiperContainer options={swiperOptions}>
                {titleKeys?.map(titleKey => (
                  <SwiperSlide key={titleKey}>
                    <div>
                      <BookThumbnail
                        title={titleKey}
                        thumbnail={groupedByTitle[titleKey][0].thumbnail}
                      />
                      <span>
                        {groupedByTitle[titleKey].length}개의 문구 등록
                      </span>
                    </div>
                  </SwiperSlide>
                ))}
              </SwiperContainer>
            </div>
          ) : (
            <span>아직 문구가 등록된 책이 없습니다.</span>
          )}
        </Section>

        <Section title="날짜별로 전체 문구 보기">
          {dateKeys?.length !== 0 ? (
            dateKeys?.map(dateKey => (
              <div key={dateKey}>
                <Tag color="purple">
                  <FiCalendar fontSize={15} />
                  <h3>{dateKey}</h3>
                </Tag>
                {groupedByDate[dateKey]?.map((sentence: ChallengeSentence) => (
                  <PostSentenceBox key={sentence.id} sentence={sentence} />
                ))}
              </div>
            ))
          ) : (
            <span>아직 공유된 문구가 없습니다.</span>
          )}
        </Section>
      </main>
    </>
  );
}
