const NOTION_BASE_URL =
  'https://www.notion.so/jellieplanet/7b5b32fff89c4b6d9e7523ae5e38cc94';

export const NOTION_PENALTY_URL = `${NOTION_BASE_URL}?pvs=4#cc4ae28282ae4579bd0dbc4d3286deda`;

export const NOTION_BOOKCLUB_RULE_URL = `${NOTION_BASE_URL}?pvs=4#e7e70fca4c0d433e90de4598da99fac3`;

export const notionUrls = [
  { name: '모임 규칙 보러 가기', url: NOTION_BOOKCLUB_RULE_URL },
  { name: '페널티 보러 가기', url: NOTION_PENALTY_URL },
];
