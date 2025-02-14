import Tag from 'components/common/Tag';
import UserName from 'components/common/user/UserName';

interface MemberListCardProps {
  title: string;
  memberList: string[];
}

export default function MemberListCard({
  title,
  memberList,
}: MemberListCardProps) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-card">
      <div className="flex items-center justify-between">
        <Tag
          text={title}
          color={title.includes('참석') ? 'green' : 'red'}
          className="mr-3"
        />
        <span className="text-[15px] text-gray1 underline">
          총 {memberList.length}명
        </span>
      </div>

      {memberList.length !== 0 ? (
        <ul className="mt-4 flex flex-wrap items-center gap-3">
          {memberList.map(member => (
            <UserName key={member} userId={member} tag isLink />
          ))}
        </ul>
      ) : (
        <span className="mt-4 block text-gray1">불참 멤버가 없어요!🚀</span>
      )}
    </div>
  );
}
