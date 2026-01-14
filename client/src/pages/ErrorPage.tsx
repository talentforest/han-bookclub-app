import { useNavigate } from 'react-router-dom';

import SquareBtn from '@/components/common/button/SquareBtn';

export default function ErrorPage() {
  const navigate = useNavigate();

  const onClick = () => {
    return navigate('/');
  };
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-y-2">
      <p>에러가 발생했습니다. 관리자에게 문의해주세요.</p>
      <SquareBtn
        className="mt-3"
        name="홈으로 이동"
        color="lightBlue"
        handleClick={onClick}
      />
    </main>
  );
}
