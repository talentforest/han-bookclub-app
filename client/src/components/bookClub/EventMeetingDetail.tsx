import { useParams } from 'react-router-dom';

import { FiPlusCircle } from 'react-icons/fi';
import { v4 } from 'uuid';

import { useHandleModal } from '@/hooks';

import { formatDate, thisYearMonthId } from '@/utils';

import { EventContent, MonthlyBookClub } from '@/types';

import EventContentFormModal from '@/components/bookClub/EventContentFormModal';
import Tag from '@/components/common/Tag';
import EditBtn from '@/components/common/button/EditBtn';
import Accordion from '@/components/common/container/Accordion';
import EmptyCard from '@/components/common/container/EmptyCard';
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

  const onContentCreateClick = () => {
    const initialContent = {
      id: v4(),
      title: '',
      detail: '',
    };

    showModal({
      element: (
        <EventContentFormModal
          initialContent={initialContent}
          contents={[...eventDetail.contents, initialContent]}
        />
      ),
    });
  };

  const params = useParams();

  const isThisYearMonthClubDetail = thisYearMonthId === params.id || !params;

  return (
    <Section
      title="이벤트 콘텐츠"
      titleBtn={
        isThisYearMonthClubDetail && (
          <button type="button" onClick={onContentCreateClick}>
            <FiPlusCircle className="text-lg text-blue1" />
          </button>
        )
      }
    >
      {eventDetail.contents.length > 0 ? (
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

              <div className="mb-4 ml-auto flex gap-x-2">
                <EditBtn
                  onClick={() => onEditClick(content)}
                  className="size-[24px] text-gray1"
                />
              </div>
            </Accordion>
          ))}
        </ul>
      ) : (
        <EmptyCard text="콘텐츠가 없습니다"></EmptyCard>
      )}

      {/* <Link
        to={'/yearClosingEvent'}
        className="ml-auto mt-5 text-sm text-purple2 underline"
      >
        연말 결산 결과 페이지로 이동
      </Link> */}
    </Section>
  );
}
