import { FiEdit3 } from 'react-icons/fi';
import { IBookFieldHost } from 'data/bookFieldHostAtom';
import { FaCaretRight } from 'react-icons/fa6';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import NameTag from '../NameTag';

interface Props {
  bookFieldhost: IBookFieldHost;
  onEditClick: () => void;
}

export default function TableItem({ bookFieldhost, onEditClick }: Props) {
  const { month, field, hosts } = bookFieldhost;

  return (
    <ItemBox className='tablebox'>
      <span className='month'>{`${month}월`}</span>
      {bookFieldhost.month === new Date().getMonth() + 1 && (
        <FaCaretRight
          fill='#888'
          style={{ position: 'absolute', left: '35px' }}
        />
      )}

      <FieldHost>
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
      </FieldHost>

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

const FieldHost = styled.div`
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
