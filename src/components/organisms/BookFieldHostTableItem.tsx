import { FiEdit3 } from 'react-icons/fi';
import { IBookFieldHost } from 'data/bookFieldHostAtom';
import { thisMonth } from 'util/index';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import NameTag from '../atoms/NameTag';

interface Props {
  bookFieldhost: IBookFieldHost;
  onEditClick: () => void;
}

export default function BookFieldHostTableItem({
  bookFieldhost,
  onEditClick,
}: Props) {
  const { month, field, hosts } = bookFieldhost;

  return (
    <ItemBox className='tablebox'>
      <MonthBox
        className='month'
        $thisMonth={bookFieldhost.month === +thisMonth}
      >
        <span>{month}월</span>
      </MonthBox>

      <BookFieldHost>
        {field ? (
          <span className='field'>{field}</span>
        ) : (
          <span className='field no_info'>분야 없음</span>
        )}

        {!!hosts?.length ? (
          <HostList className='host hostbox'>
            {hosts.map((host) => (
              <NameTag key={host} name={host} />
            ))}
          </HostList>
        ) : (
          <span className='host no_info'>발제자 없음</span>
        )}
      </BookFieldHost>

      <button type='button' onClick={onEditClick}>
        <FiEdit3 />
      </button>
    </ItemBox>
  );
}

const ItemBox = styled.div`
  > button {
    padding: 2px 8px;
  }
  @media ${device.tablet} {
    min-height: 80px;
  }
`;

const MonthBox = styled.span<{ $thisMonth: boolean }>`
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    border-radius: 28px;
    font-size: 15px;
    padding-top: 2px;
    background-color: ${({ $thisMonth, theme }) =>
      $thisMonth ? theme.container.blue1 : 'transparent'};
    color: ${({ $thisMonth, theme }) =>
      $thisMonth ? theme.text.blue1 : theme.text.default};
  }
`;

const BookFieldHost = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;

  .no_info {
    font-size: 14px;
  }
`;

const HostList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  overflow: hidden;
`;
