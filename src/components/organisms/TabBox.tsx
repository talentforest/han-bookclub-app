import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight, FiPlus } from 'react-icons/fi';
import { getCollection } from 'api/getFbDoc';
import { getFbRoute } from 'util/index';
import { useRecoilState } from 'recoil';
import { hostReviewState, subjectsState } from 'data/documentsAtom';
import Record from '../molecules/Record';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import useAlertAskJoin from 'hooks/useAlertAskJoin';

type TabName = '발제문' | '정리 기록';

interface Props {
  yearMonthId: string;
}

export default function TabBox({ yearMonthId }: Props) {
  const [tab, setTab] = useState<TabName>('발제문');
  const [hostReview, setHostReview] = useRecoilState(hostReviewState);
  const [subjects, setSubjects] = useRecoilState(subjectsState);

  const { blockLinkAndAlertJoinMember } = useAlertAskJoin('see');

  useEffect(() => {
    getCollection(getFbRoute(yearMonthId).HOST_REVIEW, setHostReview);
    getCollection(getFbRoute(yearMonthId).SUBJECTS, setSubjects);
  }, [subjects.length]);

  const { pathname } = useLocation();

  return (
    <div>
      <TabList>
        {(['발제문', '정리 기록'] as TabName[]).map((tabName) => (
          <TabItem
            key={tabName}
            $active={tabName === tab}
            onClick={() => setTab(tabName)}
          >
            <button>{tabName}</button>
          </TabItem>
        ))}
      </TabList>

      {tab === '발제문' && (
        <TabContentBox $active={tab === '발제문'}>
          {subjects[0] ? (
            <>
              <Record type='발제문' post={subjects[0]} lineClamp={8} />

              <Link
                onClick={blockLinkAndAlertJoinMember}
                className='see-more'
                to='subjects'
                state={{ id: yearMonthId, postType: '발제문' }}
              >
                <span>더보기</span>
                <FiChevronRight fontSize={16} stroke='#aaa' />
              </Link>
            </>
          ) : (
            <BtnBox>
              {pathname.includes('history') ? (
                <EmptySign>기록된 발제문이 없습니다</EmptySign>
              ) : (
                <>
                  <Link
                    to='subjects'
                    state={{ id: yearMonthId, postType: '발제문' }}
                  >
                    <FiPlus />
                    <span>{`${tab} 추가하러 가기`}</span>
                  </Link>
                  <Desc>모두 작성할 수 있어요</Desc>
                </>
              )}
            </BtnBox>
          )}
        </TabContentBox>
      )}

      {tab === '정리 기록' && (
        <TabContentBox $active={tab === '정리 기록'}>
          {hostReview[0] ? (
            <>
              <Record type='정리 기록' post={hostReview[0]} lineClamp={8} />

              <Link
                onClick={blockLinkAndAlertJoinMember}
                className='see-more'
                to='host-review'
                state={{ id: yearMonthId, postType: '정리 기록' }}
              >
                <span>더보기</span>
                <FiChevronRight fontSize={16} stroke='#aaa' />
              </Link>
            </>
          ) : (
            <BtnBox>
              {pathname.includes('history') ? (
                <EmptySign>기록된 정리 기록이 없습니다</EmptySign>
              ) : (
                <>
                  <Link
                    to='host-review'
                    state={{ id: yearMonthId, postType: '정리 기록' }}
                  >
                    <FiPlus />
                    <span>{`${tab} 추가하러 가기`}</span>
                  </Link>
                  <Desc>이달의 발제자만 작성할 수 있어요</Desc>
                </>
              )}
            </BtnBox>
          )}
        </TabContentBox>
      )}
    </div>
  );
}

const EmptySign = styled.span`
  font-size: 15px;
  text-align: center;
  height: 100%;
  display: block;
  color: ${({ theme }) => theme.text.gray3};
`;

const TabList = styled.ul`
  display: flex;
  gap: 4px;
  margin-top: 10px;
`;

const TabItem = styled.li<{ $active: boolean }>`
  background-color: ${({ $active, theme }) =>
    $active ? theme.container.blue1 : '#fff'};
  box-shadow: 2px -2px 4px rgba(156, 155, 155, 0.3);
  padding: 10px 12px 8px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  button {
    font-size: 15px;
    color: ${({ $active, theme }) =>
      $active ? theme.text.purple : theme.text.gray2};
  }
`;

const TabContentBox = styled.div<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 220px;
  max-height: 360px;
  padding: 15px 15px 8px;
  border-radius: 10px;
  border-top-left-radius: 0;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ $active, theme }) =>
    $active ? theme.container.blue1 : '#fff'};
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

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 10px;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: ${({ theme }) => theme.text.blue3};
    span {
      font-size: 16px;
      color: ${({ theme }) => theme.text.blue3};
    }
    svg {
      stroke: ${({ theme }) => theme.text.blue3};
      width: 18px;
      height: 18px;
      margin-right: 4px;
      margin-bottom: 4px;
    }
  }
  @media ${device.tablet} {
    a {
      font-size: 18px;
      svg {
        fill: ${({ theme }) => theme.text.blue3};
        margin-right: 5px;
      }
    }
  }
`;

const Desc = styled.p`
  text-align: center;

  font-size: 14px;
  color: ${({ theme }) => theme.text.gray2};
`;
