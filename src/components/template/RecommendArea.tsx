import { useRecoilState, useSetRecoilState } from 'recoil';
import { getFbRoute, CLUB_INFO } from 'util/index';
import { getCollection, getDocument } from 'api/getFbDoc';
import { useEffect } from 'react';
import { recommendsState, thisMonthState } from 'data/documentsAtom';
import { useLocation } from 'react-router-dom';
import RecommendCreateBox from 'components/organisms/bookclubthismonth/RecommendCreateBox';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import Record from 'components/organisms/RecordBox';

interface IRecommendationAreaProps {
  monthId: string;
}

const RecommendArea = ({ monthId }: IRecommendationAreaProps) => {
  const setThisMonthDoc = useSetRecoilState(thisMonthState);
  const [recommends, setRecommends] = useRecoilState(recommendsState);
  const { pathname } = useLocation();

  useEffect(() => {
    getDocument(CLUB_INFO, `${monthId}`, setThisMonthDoc);
    getCollection(getFbRoute(monthId).RECOMMEND, setRecommends);
  }, [setThisMonthDoc, setRecommends, monthId]);

  return (
    <>
      {pathname.includes('bookclub') && <RecommendCreateBox />}
      <RecordBox>
        {recommends.length !== 0 ? (
          recommends?.map((recommend) => (
            <Record
              key={recommend.id}
              doc={recommend}
              collectionName={getFbRoute(monthId).RECOMMEND}
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
    border-radius: 30px;
    padding: 8px 30px;
  }
`;

export default RecommendArea;
