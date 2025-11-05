import UserImgName from '@/components/common/user/UserImgName';

interface MemberListCardProps {
  title: string;
  memberList: string[];
}

export default function MemberListCard({
  title,
  memberList,
}: MemberListCardProps) {
  return (
    <div className="rounded-card bg-white shadow-card">
      <h3
        className={`rounded-t-card border-b-2 border-dotted px-4 pb-3 pt-4 text-[15px] font-medium ${title.includes('참석') ? 'border-green3 text-green1' : 'border-red-100 text-pointCoral'}`}
      >
        {title.includes('참석') ? '👋' : '💥'} {title}
      </h3>

      {memberList.length !== 0 ? (
        <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3 px-4 pb-4">
          {memberList.map(member => (
            <li key={member}>
              <UserImgName userId={member} isLink />
            </li>
          ))}
        </ul>
      ) : (
        <span className="mt-4 block px-4 pb-4 text-gray2">
          불참 멤버가 없어요!🚀
        </span>
      )}
    </div>
  );
}
