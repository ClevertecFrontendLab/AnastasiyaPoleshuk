import { IGetBook, IGetBooks } from '../../types/apiTypes';
import { GET__BOOKS, GET__BOOK } from '../actionTypes';

export const GetBooksAction = (payload: IGetBooks) => {
  return { type: GET__BOOKS, payload };
};

export const GetBookAction = (payload: IGetBook) => {
  return { type: GET__BOOK, payload };
};
