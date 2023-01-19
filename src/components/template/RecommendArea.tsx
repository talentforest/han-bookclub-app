import { useRecoilState, useSetRecoilState } from 'recoil';
import { getFbRoute } from 'util/index';
import { getCollection, getDocument } from 'api/getFbDoc';
import { useEffect } from 'react';
import { clubInfoByMonthState, recommendsState } from 'data/documentsAtom';
import { useLocation } from 'react-router-dom';
import RecommendCreateBox from 'components/organisms/bookclubthismonth/RecommendCreateBox';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import Record from 'components/organisms/RecordBox';

interface IRecommendationAreaProps {
  yearMonthId: string;
}

const RecommendArea = ({ yearMonthId }: IRecommendationAreaProps) => {
  const setClubInfo = useSetRecoilState(clubInfoByMonthState);
  const [recommends, setRecommends] = useRecoilState(recommendsState);
  const { pathname } = useLocation();
  const year = yearMonthId.slice(0, 4);

  useEffect(() => {
    getDocument(`BookClub-${year}`, `${yearMonthId}`, setClubInfo);
    getCollection(getFbRoute(yearMonthId).RECOMMENDED_BOOKS, setRecommends);
  }, [year, setClubInfo, setRecommends, yearMonthId]);

  return (
    <>
      {pathname.includes('bookclub') && <RecommendCreateBox />}
      <RecordBox>
        {recommends.length !== 0 ? (
          recommends?.map((recommend) => (
            <Record
              key={recommend.id}
              doc={recommend}
              collectionName={getFbRoute(yearMonthId).RECOMMENDED_BOOKS}
            />
          ))
        ) : (
          <EmptyBox>
            {pathname.includes('history')
              ? '추천된 책이 없습니다.'
              : '첫번째로 추천하고 싶은 책을 남겨보세요.'}
          </EmptyBox>
        )}
      </RecordBox>
    </>
  );
};

export const RecordBox = styled.div`
  display: flex;
  flex-direction: column;
`;
export const EmptyBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  margin: 20px auto 70px;
  padding: 5px 20px;
  text-align: center;
  border-radius: 10px;
  font-size: 14px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.theme.container.default};
  @media ${device.tablet} {
    font-size: 16px;
    border-radius: 15px;
    padding: 8px 30px;
  }
`;

export default RecommendArea;
