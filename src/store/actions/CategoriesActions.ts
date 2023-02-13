import { ICategories } from '../../types/apiTypes';
import { GET__CATEGORIES } from '../actionTypes';

export const CategoriesActions = (payload: ICategories) => {
  return { type: GET__CATEGORIES, payload };
};
