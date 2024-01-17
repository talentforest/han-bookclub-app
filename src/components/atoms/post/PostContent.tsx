import styled from 'styled-components';

interface Props {
  text: string;
  lineClamp?: number | 'none';
}

export default function PostContent({ text, lineClamp }: Props) {
  return (
    <ContentBox
      $lineClamp={lineClamp}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}

const ContentBox = styled.div<{ $lineClamp: number | 'none' }>`
  display: -webkit-box;
  line-clamp: ${(props) => props.$lineClamp};
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 10px;
  min-height: ${(props) => (props.$lineClamp === 'none' ? '150px' : '20px')};
  flex: ${(props) => (props.$lineClamp === 'none' ? 0 : 1)};
  line-height: 1.6;

  p,
  blockquote,
  li {
    margin-bottom: 10px;
  }

  blockquote {
    padding-left: 8px;
    padding-top: 0px;
    line-height: 1.5;
    color: #666;
    border-left: 4px solid #aaa;
  }

  ol,
  ul {
    padding-left: 20px;
    margin-bottom: 5px;
    li {
      &:before {
        display: none;
      }
      &:not(.ql-direction-rtl) {
        padding-left: 0;
      }
      &:not(.ql-direction-rtl)::before {
        margin: 0;
        padding-left: 0;
        text-align: center;
      }
    }
  }
  ul {
    li {
      list-style-type: disc;
    }
  }
  ol {
    li {
      list-style-type: decimal;
    }
  }
  a {
    font-size: 15px;
    color: ${(props) => props.theme.text.lightBlue};
    text-decoration: underline;
  }
`;
