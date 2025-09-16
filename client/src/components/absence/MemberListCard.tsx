import Tag from '@/components/common/Tag';
import UserName from '@/components/common/user/UserName';

interface MemberListCardProps {
  title: string;
  memberList: string[];
}

export default function MemberListCard({
  title,
  memberList,
}: MemberListCardProps) {
  return (
    <div className="rounded-card bg-white p-4 shadow-card">
      <Tag
        text={title}
        color={title.includes('참석') ? 'green' : 'red'}
        className="mr-3 font-medium"
      />

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
