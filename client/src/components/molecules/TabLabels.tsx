import styled from 'styled-components';

export type TabName = '발제문' | '정리 기록';

interface Props {
  tabList: TabName[];
  setCurrTab: React.Dispatch<React.SetStateAction<TabName>>;
  currTab: TabName;
}

export default function TabLabels({ tabList, currTab, setCurrTab }: Props) {
  return (
    <TabList>
      {tabList.map((tab) => (
        <TabItem
          key={tab}
          $active={tab === currTab}
          onClick={() => setCurrTab(tab)}
        >
          <button>{tab}</button>
        </TabItem>
      ))}
    </TabList>
  );
}

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
