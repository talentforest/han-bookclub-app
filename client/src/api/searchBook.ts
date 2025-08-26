import { BookData } from '@/types';
import axios from 'axios';

type SearchBookParams = {
  query: string;
  sort?: string; // accuracy 정확도(기본값) | latest 최신
  page?: number; // 페이지 번호
  size?: number; // 한 페이지에 보여질 문서 수, 1 ~ 50 사이 기본값 10
  target?: string; // 검색 필드 제한, 사용가능한 값: title, isbn, publisher, person
};

const Kakao = axios.create({
  baseURL: 'https://dapi.kakao.com',
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_BOOK_API_KEY}`,
  },
});

export const searchBook = (params: SearchBookParams) => {
  return Kakao.get('/v3/search/book', { params });
};

export const searchBookHandler = async (
  query: string,
  setFunc: (bookData: BookData[]) => void,
) => {
  const params = { query };
  const { data } = await searchBook(params);
  setFunc(data.documents);
};
