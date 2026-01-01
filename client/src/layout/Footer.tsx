import ChevronRightLinkBtn from '@/components/common/button/ChevronRightLinkBtn';

export default function Footer() {
  return (
    <footer className="flex flex-col items-start gap-y-4 border-t border-gray3 bg-blue1 px-4 pb-40 pt-10">
      <ChevronRightLinkBtn
        to="/setting/bookclub-rules"
        title="독서모임 한페이지 규칙 보기"
        className="text-white"
      />
      <span className="mb-10 text-sm text-blue4">
        ⓒ 독서모임 한페이지 All rights reserved
      </span>
    </footer>
  );
}
