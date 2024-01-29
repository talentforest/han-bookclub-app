import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface Props {
  text: string;
  lineClamp?: number;
}

export default function EditorContent({ text, lineClamp }: Props) {
  return (
    <ContentBox
      $lineClamp={lineClamp}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}

const ContentBox = styled.p<{ $lineClamp: number }>`
  display: -webkit-box;
  -webkit-line-clamp: ${({ $lineClamp }) => $lineClamp};
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 5px;
  min-height: ${({ $lineClamp }) => ($lineClamp === 0 ? '100px' : '20px')};
  flex: ${({ $lineClamp }) => $lineClamp};
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
    color: ${({ theme }) => theme.text.blue1};
    text-decoration: underline;
  }
  @media ${device.tablet} {
    min-height: ${({ $lineClamp }) => ($lineClamp === 0 ? '110px' : '50px')};
  }
`;
