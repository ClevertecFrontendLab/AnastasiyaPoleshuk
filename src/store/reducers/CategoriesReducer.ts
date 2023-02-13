import { ICategories } from '../../types/apiTypes';
import { IStore } from '../../types/storeTypes';
import { GET__CATEGORIES } from '../actionTypes';
import { initialState } from '../initialState';

interface IAction {
  type: string,
    payload: ICategories,
}

export const CategoriesReducer = (state = initialState as unknown as IStore, action: IAction) => {
  switch (action.type) {
    case GET__CATEGORIES:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};
