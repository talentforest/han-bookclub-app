import axios from "axios";
import { BookDocument } from "data/bookAtom";

interface BookQuery {
  query: string; // 검색을 원하는 질의어
  sort?: string; // accuracy 정확도(기본값) | latest 최신
  page?: number; // 페이지 번호
  size?: number; // 한 페이지에 보여질 문서 수, 1 ~ 50 사이 기본값 10
  target?: string; // 검색 필드 제한, 사용가능한 값: title, isbn, publisher, person
}

const Kakao = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: "KakaoAK e8625f56dd420c3a1e0b08fa4e2550d4",
  },
});

export const bookSearch = (params: BookQuery) => {
  return Kakao.get("/v3/search/book", { params });
};

export const bookSearchHandler = async (
  query: string,
  reset: boolean,
  setFunc: (bookData: BookDocument[]) => void
) => {
  const params = {
    query: query,
  };
  const { data } = await bookSearch(params);
  setFunc(data.documents);
};
