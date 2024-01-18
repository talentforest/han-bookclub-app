import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface Props {
  title: '계정 생성' | '비밀번호 찾기' | '';
}

export default function Header({ title }: Props) {
  const navigate = useNavigate();

  const onBackClick = () => navigate(-1);

  return (
    <HeaderBox>
      <button type='button' onClick={onBackClick}>
        <FiChevronLeft fontSize={20} />
      </button>
      <h1>{title}</h1>
    </HeaderBox>
  );
}
const HeaderBox = styled.header`
  padding: 15px 20px 5px;
  height: 45px;
  margin-top: 10px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 3px;
  h1 {
    color: ${(props) => props.theme.text.gray};
  }
  padding: 0 20px;
  @media ${device.tablet} {
    padding: 20px 80px;
    h1 {
      font-size: 20px;
    }
  }
  @media ${device.desktop} {
    padding: 0;
    padding-top: 15px 0;
    width: 70%;
    margin: 10px auto;
  }
`;
