export type BookData = {
  title: string;
  thumbnail: string;
  authors: string[];
  publisher: string;
  url: string;
  contents: string;
  isbn: string;
  datetime: string;
  translators: string[];
  price: number;
  sale_price: number;
  status: string;
};

export type BaseBookData = Pick<
  BookData,
  'title' | 'thumbnail' | 'authors' | 'url' | 'publisher'
>;
