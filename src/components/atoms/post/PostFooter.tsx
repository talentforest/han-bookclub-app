import { getLocaleDate } from 'util/index';
import { IDocument } from 'data/documentsAtom';
import styled from 'styled-components';
import LikesBox from '../../molecules/LikesBox';

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
      <span>{getLocaleDate(createdAt)}</span>

      {footerType === 'likes' && <LikesBox collName={collName} post={post} />}
    </Footer>
  );
}

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > span {
    font-size: 14px;
    color: #aaa;
  }
`;
