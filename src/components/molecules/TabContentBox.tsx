import { IDocument } from 'data/documentsAtom';
import { FiChevronRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { TabName } from './TabLabels';
import useAlertAskJoin from 'hooks/useAlertAskJoin';
import Post from 'components/molecules/Post';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface Props {
  currTab: TabName;
  post: IDocument;
  yearMonthId: string;
  editable: boolean;
}

export default function TabContentBox({
  currTab,
  post,
  yearMonthId,
  editable,
}: Props) {
  const { blockLinkAndAlertJoinMember } = useAlertAskJoin('see');

  const linkTo = currTab === '발제문' ? 'subjects' : 'host-review';

  return (
    <TabContent>
      {post ? (
        <>
          <Post type={currTab} post={post} lineClamp={7} />

          <Link
            to={linkTo}
            onClick={blockLinkAndAlertJoinMember}
            className='see-more'
            state={{ id: yearMonthId, postType: currTab }}
          >
            <span>더보기</span>
            <FiChevronRight fontSize={16} stroke='#aaa' />
          </Link>
        </>
      ) : (
        <>
          {editable ? (
            <GoToAddPostBox>
              <Link to={linkTo} state={{ id: yearMonthId, postType: currTab }}>
                <FiPlus />
                <span>{currTab} 추가하러 가기</span>
              </Link>

              <Desc>모두 작성할 수 있어요</Desc>
            </GoToAddPostBox>
          ) : (
            <EmptySign>기록된 {currTab}이 없습니다</EmptySign>
          )}
        </>
      )}
    </TabContent>
  );
}

const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
  max-height: 260px;
  padding: 15px 15px 8px;
  border-radius: 10px;
  border-top-left-radius: 0;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.container.blue1};
  pre {
    margin-bottom: 10px;
  }
  .see-more {
    height: 25px;
    display: flex;
    justify-content: end;
    align-items: center;
    span {
      padding-top: 3px;
      color: #aaa;
      font-size: 14px;
    }
  }
  @media ${device.tablet} {
    min-height: 240px;
    .see-more {
      span {
        padding-top: 4px;
        font-size: 16px;
      }
    }
  }
`;

const Desc = styled.p`
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.text.gray2};
`;

const GoToAddPostBox = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  a {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 4px;
    span {
      color: ${({ theme }) => theme.text.blue3};
    }
    svg {
      stroke: ${({ theme }) => theme.text.blue3};
    }
  }
`;

const EmptySign = styled.span`
  font-size: 15px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text.gray2};
`;
