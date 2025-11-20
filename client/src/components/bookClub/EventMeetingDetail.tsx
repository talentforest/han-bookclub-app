import { useHandleModal } from '@/hooks';

import { formatDate } from '@/utils';

import { EventContent, MonthlyBookClub } from '@/types';

import EventContentFormModal from '@/components/bookClub/EventContentFormModal';
import Tag from '@/components/common/Tag';
import EditBtn from '@/components/common/button/EditBtn';
import Accordion from '@/components/common/container/Accordion';
import Section from '@/components/common/container/Section';

interface EventMeetingDetailProps {
  eventDetail: MonthlyBookClub['meeting']['eventMonth'];
}

export default function EventMeetingDetail({
  eventDetail,
}: EventMeetingDetailProps) {
  const { showModal } = useHandleModal();

  const onEditClick = async (content?: EventContent) => {
    showModal({
      element: (
        <EventContentFormModal
          initialContent={content}
          contents={eventDetail.contents}
        />
      ),
    });
  };

  return (
    <Section title="이벤트 콘텐츠">
      <ul className="flex flex-col gap-y-3">
        {eventDetail.contents.map(content => (
          <Accordion
            key={content.id}
            title={`${content.title} ${content?.reward ? '💸' : ''} ${content?.deadline ? '📆' : ''}`}
          >
            <div className="flex items-start gap-x-1">
              {content?.reward && (
                <Tag
                  text={`${content?.reward ? '💸' : ''} 도서상품권`}
                  shape="rounded"
                  className="!mb-2 border border-blue3 !px-2.5 !py-1.5 !text-[13px] font-medium"
                />
              )}
              {content?.deadline && (
                <Tag
                  text={`${content?.deadline ? '📆' : ''} ${formatDate(content.deadline, 'yy.M.d')} 까지`}
                  color="lightGreen"
                  shape="rounded"
                  className="!mb-2 border border-green-500 !px-2.5 !py-1.5 !text-[13px] font-medium"
                />
              )}
            </div>

            <p className="whitespace-pre-wrap px-0.5 text-[15px] text-gray1">
              {content.detail || '콘텐츠 상세 정보가 없어요.'}
            </p>

            <EditBtn
              onClick={() => onEditClick(content)}
              className="mb-4 ml-auto size-[24px] text-gray1"
            />
          </Accordion>
        ))}
      </ul>
    </Section>
  );
}
