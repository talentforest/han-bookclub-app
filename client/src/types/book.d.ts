export type BookData = {
  title: string;
  contents: string;
  url: string;
  isbn: string;
  datetime: string;
  authors: string[];
  publisher: string;
  translators: string[];
  price: number;
  thumbnail: string;
};

export type BaseBookData = Pick<
  BookData,
  'title' | 'thumbnail' | 'authors' | 'url' | 'publisher'
>;
