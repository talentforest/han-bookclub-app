import { getLocalDate } from 'util/index';
import { IDocument } from 'data/documentsAtom';
import styled from 'styled-components';
import LikesBox from '../LikesBox';

interface Props {
  post?: IDocument;
  createdAt: number;
  footerType?: 'likes';
  collName?: string;
}

export default function PostFooter({
  post,
  createdAt,
  footerType,
  collName,
}: Props) {
  return (
    <Footer>
      <span>{getLocalDate(createdAt)}</span>

      {footerType === 'likes' && <LikesBox collName={collName} record={post} />}
    </Footer>
  );
}

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  > span {
    font-size: 14px;
    color: #aaa;
  }
`;
