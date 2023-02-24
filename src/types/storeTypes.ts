import { ICategories, IError,IGetBook, IGetBooks } from './apiTypes';

export interface IStore {
    books: {
        books: IGetBooks[];
        book: IGetBook;
    },
    error: {
        error: IError,
    },
    categories: {
        categories: ICategories[],
    },
    isLoading: boolean,
    isError: boolean,
}

export interface IGetBooksResponse {
    data: IGetBooks | IError;
    status: number;
}

export interface IGetBookResponse {
    data: IGetBook | IError;
    status: number;
}

export interface ICategoriesResponse {
    data: ICategories | IError;
    status: number;
}

export interface ISetError {
    data: IError;
    isError: boolean;
}

