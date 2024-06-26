import styled from 'styled-components';

export default function Footer() {
  return (
    <FooterContainer>
      <span>ⓒ 독서모임 한페이지 All rights reserved</span>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  padding: 15px 25px 20px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #ddd;
  > span {
    margin-top: 20px;
    color: ${({ theme }) => theme.text.gray2};
    font-size: 15px;
  }
  div {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 10px;
    h4 {
      color: ${({ theme }) => theme.text.gray2};
    }
    svg {
      fill: ${({ theme }) => theme.text.gray2};
    }
  }
  ul {
    padding-left: 20px;
    li {
      list-style: disc;
    }
  }
  a {
    display: flex;
    align-items: center;
    gap: 5px;
    span {
      line-height: 1.5;
      color: ${({ theme }) => theme.text.gray4};
    }
    svg {
      stroke: ${({ theme }) => theme.text.gray3};
      margin-bottom: 4px;
    }
    padding-bottom: 8px;
  }
`;
