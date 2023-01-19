import { IDocument } from 'data/documentsAtom';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface IRecommendBookBoxProps {
  recommend: IDocument;
}

const RecommendBookBox = ({ recommend }: IRecommendBookBoxProps) => {
  const { recommendedBook } = recommend;

  return (
    <RecommendBook>
      <img src={recommendedBook.thumbnail} alt='recommend book' />
      <div>
        <h5>{recommendedBook.title}</h5>
        <span>{recommendedBook.authors?.join(', ')}</span>
        {recommendedBook.url && (
          <a href={recommendedBook.url} target='_blank' rel='noreferrer'>
            상세정보 보러가기
          </a>
        )}
      </div>
    </RecommendBook>
  );
};

const RecommendBook = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 5px;
  > img {
    width: auto;
    height: 50px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    margin-right: 15px;
  }
  > div {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    > h5 {
      font-weight: 700;
    }
    > a {
      color: ${(props) => props.theme.text.accent};
    }
  }
  @media ${device.tablet} {
    padding: 15px;
    > img {
      height: 65px;
    }
    > div {
      font-size: 16px;
    }
  }
`;

export default RecommendBookBox;
