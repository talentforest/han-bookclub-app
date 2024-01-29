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

export default function ChallengePagePosition({
  currentPage,
  wholePage,
  editable,
  onEditClick,
}: Props) {
  const { pathname } = useLocation();

  const percentNum = getPercentage(currentPage, wholePage);

  return (
    <Position>
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
  height: 12px;
  width: 100%;
  padding: 2px;

  @media ${device.tablet} {
    margin-top: 26px;
  }
`;

const Page = styled.div`
  position: absolute;
  right: 0;
  top: -25px;
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
  background-color: ${({ theme }) => theme.container.green1};
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
