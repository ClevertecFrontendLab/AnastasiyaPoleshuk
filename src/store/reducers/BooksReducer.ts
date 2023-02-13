import { IGetBook, IGetBooks } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';
import { GET__BOOK,GET__BOOKS } from '../actionTypes';
import { initialState } from '../initialState';

interface IAction {
  type: string,
  payload: IGetBooks | IGetBook,
}

export const BooksReducer = (state = initialState as unknown as IStore, action: IAction) => {
  switch (action.type) {
    case GET__BOOKS:
      return { ...state, books: action.payload };
    case GET__BOOK:
      return { ...state, book: action.payload };
    default:
      return state;
  }
};
