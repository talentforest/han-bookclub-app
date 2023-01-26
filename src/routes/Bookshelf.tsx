import { AccountCircle } from '@mui/icons-material';
import { ProfileImg } from 'components/atoms/ProfileImage';
import { IExtraUserData } from 'data/userAtom';
import { useLocation } from 'react-router-dom';
import { Header } from 'layout/MobileHeader';
import { deviceSizes } from 'theme/mediaQueries';
import Loading from 'components/atoms/Loading';
import Subtitle from 'components/atoms/Subtitle';
import CategoryBtns from 'components/organisms/CategoryBtns';
import MyRecord from 'components/organisms/mybookshelf/MyRecord';
import MyRecommendBook from 'components/organisms/mybookshelf/MyRecommendBook';
import useCategory from 'hooks/useCategory';
import useWindowSize from 'hooks/useWindowSize';
import {
  EmptyBox,
  FavFieldList,
  ProfileBox,
  RecordList,
  Section,
} from './MyBookshelf';

type LocationState = { state: { user: IExtraUserData } };

const Bookshelf = () => {
  const { windowSize } = useWindowSize();
  const { category, onCategoryClick } = useCategory();
  const {
    state: { user },
  } = useLocation() as LocationState;
  const {
    userRecords: { subjects, reviews, hostReviews, recommendedBooks },
  } = user;

  return user ? (
    <>
      {windowSize.width < +deviceSizes.tablet && (
        <Header>{user.displayName}님의 책장</Header>
      )}
      <main>
        <ProfileBox>
          {user?.photoUrl ? (
            <ProfileImg src={user.photoUrl} alt='profile' />
          ) : (
            <AccountCircle />
          )}
          <span>{user?.displayName}</span>
        </ProfileBox>
        <Section>
          <Subtitle title={`${user.displayName}님이 좋아하는 독서 분야`} />
          <FavFieldList>
            {user.favoriteBookField.map((field) => (
              <li key={field.id}>{field.name}</li>
            ))}
          </FavFieldList>
        </Section>
        <Section>
          <Subtitle title={`${user.displayName}님의 발제자의 정리 기록`} />
          <RecordList>
            {hostReviews?.length ? (
              hostReviews.map((hostReview) => (
                <MyRecord
                  key={hostReview.docId}
                  recordId={hostReview}
                  recordSort='hostReview'
                />
              ))
            ) : (
              <EmptyBox>아직 작성한 발제자의 정리 기록이 없어요</EmptyBox>
            )}
          </RecordList>
        </Section>
        <Section>
          <Subtitle title={`${user.displayName}님의 독서모임 기록`} />
          <CategoryBtns
            category={category}
            onCategoryClick={onCategoryClick}
            myRecord
          />
          <RecordList>
            {category === 'recommends' &&
              (recommendedBooks?.length ? (
                recommendedBooks?.map((recommendedBook) => (
                  <MyRecommendBook
                    key={recommendedBook.docId}
                    recommendedBookId={recommendedBook}
                  />
                ))
              ) : (
                <EmptyBox>아직 추천했던 책이 없어요.</EmptyBox>
              ))}
            {category === 'subjects' &&
              (subjects?.length ? (
                subjects?.map((subject) => (
                  <MyRecord
                    key={subject.docId}
                    recordId={subject}
                    recordSort='subjects'
                  />
                ))
              ) : (
                <EmptyBox>아직 작성한 발제문이 없어요.</EmptyBox>
              ))}
            {category === 'reviews' &&
              (reviews?.length ? (
                reviews?.map((review) => (
                  <MyRecord
                    key={review.docId}
                    recordId={review}
                    recordSort='reviews'
                  />
                ))
              ) : (
                <EmptyBox>아직 작성했던 모임 후기가 없어요.</EmptyBox>
              ))}
          </RecordList>
        </Section>
      </main>
    </>
  ) : (
    <Loading />
  );
};

export default Bookshelf;
