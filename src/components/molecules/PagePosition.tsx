import { FaRunning } from 'react-icons/fa';
import { FiEdit3 } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { getPercentage } from 'util/index';
import styled from 'styled-components';
import PageWithPercent from 'components/atoms/PageWithPercent';
import device from 'theme/mediaQueries';

interface Props {
  currentPage: number;
  wholePage: number;
  editable: boolean;
  onEditClick: () => void;
}

export default function PagePosition({
  currentPage,
  wholePage,
  editable,
  onEditClick,
}: Props) {
  const { pathname } = useLocation();

  const percentNum = getPercentage(currentPage, wholePage);

  return (
    <Position>
      {percentNum === 100 && <CompleteMark>⭐️챌린지 달성⭐️</CompleteMark>}

      <Page>
        {pathname === '/challenge' && editable ? (
          <button type='button' onClick={onEditClick}>
            <FiEdit3 />
            <PageWithPercent currentPage={currentPage} wholePage={wholePage} />
          </button>
        ) : (
          <PageWithPercent currentPage={currentPage} wholePage={wholePage} />
        )}
      </Page>

      <ProgressBar $width={percentNum}>
        <FaRunning fontSize={14} />
      </ProgressBar>
    </Position>
  );
}

const Position = styled.div`
  position: relative;
  margin-top: 30px;
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.container.blue2};
  border-radius: 20px;
  height: 13px;
  width: 100%;
  padding: 3px;
  @media ${device.tablet} {
    margin-top: 26px;
  }
`;

const CompleteMark = styled.div`
  position: absolute;
  left: 0;
  top: -28px;
  border-radius: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.text.green};
`;

const Page = styled.div`
  position: absolute;
  right: 0;
  top: -28px;
  > button {
    display: flex;
    align-items: center;
    gap: 6px;
    svg {
      font-size: 12px;
      stroke: ${({ theme }) => theme.text.gray3};
    }
  }
`;

const ProgressBar = styled.div<{ $width: number }>`
  position: relative;
  background-color: ${({ theme, $width }) =>
    $width === 100 ? theme.container.green2 : theme.container.yellow2};
  width: ${({ $width }) => `${$width}%`};
  height: 100%;
  border-radius: 30px;
  max-width: 100%;
  min-width: 0%;
  svg {
    position: absolute;
    right: -5px;
    bottom: 4px;
    fill: ${({ theme }) => theme.text.green};
  }
`;
