import { useRecoilState } from 'recoil';
import { getFbRoute } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import { useEffect } from 'react';
import { recommendsState } from 'data/documentsAtom';
import { useLocation } from 'react-router-dom';
import RecommendCreateBox from 'components/organisms/bookclubthismonth/RecommendCreateBox';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import RecordBox from 'components/organisms/RecordBox';

interface IRecommendationAreaProps {
  yearMonthId: string;
}

const RecommendArea = ({ yearMonthId }: IRecommendationAreaProps) => {
  const [recommends, setRecommends] = useRecoilState(recommendsState);
  const { pathname } = useLocation();
  const historyPage = pathname.includes('history');

  useEffect(() => {
    getCollection(getFbRoute(yearMonthId).RECOMMENDED_BOOKS, setRecommends);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!historyPage && <RecommendCreateBox />}
      <Record $grid>
        {recommends.length !== 0 ? (
          recommends?.map((recommend) => (
            <RecordBox
              key={recommend.id}
              doc={recommend}
              collName={getFbRoute(yearMonthId).RECOMMENDED_BOOKS}
            />
          ))
        ) : (
          <EmptyBox>
            {historyPage
              ? '추천된 책이 없습니다.'
              : '첫번째로 추천하고 싶은 책을 남겨보세요.'}
          </EmptyBox>
        )}
      </Record>
    </>
  );
};

export const Record = styled.div<{ $grid?: boolean }>`
  display: flex;
  flex-direction: column;
  @media ${device.desktop} {
    display: ${(props) => (props.$grid ? 'grid' : 'block')};
    grid-template-columns: ${(props) => (props.$grid ? 'repeat(2, 1fr)' : '')};
    gap: 20px;
  }
`;
export const EmptyBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 180px;
  margin: 0 auto 70px;
  padding: 5px 20px;
  text-align: center;
  border-radius: 10px;
  font-size: 14px;
  box-shadow: ${(props) => props.theme.boxShadow};
  background-color: ${(props) => props.theme.container.default};
  @media ${device.tablet} {
    font-size: 16px;
    border-radius: 15px;
    padding: 8px 30px;
    height: 240px;
  }
`;

export default RecommendArea;
