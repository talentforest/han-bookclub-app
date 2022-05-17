import axios from "axios";

interface BookQuery {
  query: string;
  sort?: string; // accuracy | recency 정확도 or 최신
  page?: number; // 페이지번호
  size?: number;
}

const Kakao = axios.create({
  baseURL: "https://dapi.kakao.com", // 공통 요청 경로를 지정해준다.
  headers: {
    Authorization: "KakaoAK e8625f56dd420c3a1e0b08fa4e2550d4",
  },
});

// search book api
export const bookSearch = (params: BookQuery) => {
  return Kakao.get("/v3/search/book", { params });
};
