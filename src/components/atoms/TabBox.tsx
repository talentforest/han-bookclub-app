import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiPlus } from 'react-icons/fi';
import { getCollection } from 'api/getFbDoc';
import { getFbRoute } from 'util/index';
import { useRecoilState } from 'recoil';
import { hostReviewState, subjectsState } from 'data/documentsAtom';
import Record from './post/Record';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

type TabName = '발제문' | '정리 기록';

interface Props {
  yearMonthId: string;
}

export default function TabBox({ yearMonthId }: Props) {
  const [tab, setTab] = useState<TabName>('발제문');
  const [hostReview, setHostReview] = useRecoilState(hostReviewState);
  const [subjects, setSubjects] = useRecoilState(subjectsState);

  useEffect(() => {
    getCollection(getFbRoute(yearMonthId).HOST_REVIEW, setHostReview);
    getCollection(getFbRoute(yearMonthId).SUBJECTS, setSubjects);
  }, [subjects.length]);

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

      <TabContentBox>
        {tab === '발제문' &&
          (subjects[0] ? (
            <>
              <Record type='발제문' post={subjects[0]} lineClamp={10} />

              <Link
                to='subjects'
                state={{ id: yearMonthId, postType: '발제문' }}
              >
                <span>더보기</span>
                <FiChevronRight fontSize={16} stroke='#aaa' />
              </Link>
            </>
          ) : (
            <BtnBox>
              <Link
                to='subjects'
                state={{ id: yearMonthId, postType: '발제문' }}
              >
                <FiPlus />
                <span>{`${tab} 추가하러 가기`}</span>
              </Link>
              <Desc>모두 작성할 수 있어요</Desc>
            </BtnBox>
          ))}

        {tab === '정리 기록' &&
          (hostReview[0] ? (
            <>
              <Record type='정리 기록' post={hostReview[0]} lineClamp={10} />

              <Link
                to='host-review'
                state={{ id: yearMonthId, postType: '정리 기록' }}
              >
                <span>더보기</span>
                <FiChevronRight fontSize={16} stroke='#aaa' />
              </Link>
            </>
          ) : (
            <BtnBox>
              <Link
                to='host-review'
                state={{ id: yearMonthId, postType: '정리 기록' }}
              >
                <FiPlus />
                <span>{`${tab} 추가하러 가기`}</span>
              </Link>
              <Desc>이달의 발제자만 작성할 수 있어요</Desc>
            </BtnBox>
          ))}
      </TabContentBox>
    </div>
  );
}

const TabList = styled.ul`
  display: flex;
  gap: 4px;
  margin-top: 10px;
`;

const TabItem = styled.li<{ $active: boolean }>`
  background-color: ${(props) =>
    props.$active ? props.theme.container.purple : '#fff'};
  box-shadow: 2px -2px 4px rgba(156, 155, 155, 0.3);
  padding: 10px 12px 8px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;

  button {
    font-size: 15px;
  }
`;

const TabContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
  max-height: 342px;
  padding: 15px 15px 8px;
  border-radius: 10px;
  border-top-left-radius: 0;
  box-shadow: ${(props) => props.theme.boxShadow};
  background-color: ${(props) => props.theme.container.default};

  pre {
    margin-bottom: 10px;
  }
  a {
    padding-top: 5px;
    display: flex;
    justify-content: end;
    height: 35px;
    align-items: center;
    span {
      color: #aaa;
      font-size: 14px;
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
    color: ${(props) => props.theme.text.accent};
    span {
      font-size: 16px;
      color: ${(props) => props.theme.text.accent};
    }
    svg {
      stroke: ${(props) => props.theme.text.accent};
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
        fill: ${(props) => props.theme.text.accent};
        width: 25px;
        height: 25px;
        margin-right: 5px;
      }
    }
  }
`;

const Desc = styled.p`
  text-align: center;

  font-size: 13px;
  color: ${(props) => props.theme.text.mediumGray};
`;
