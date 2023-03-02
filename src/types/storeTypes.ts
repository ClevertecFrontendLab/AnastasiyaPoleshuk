import { ICategories, IError, IGetBook, IGetBooks, IUserResponse } from './apiTypes';

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
    user: {
        user: {
            user: IUserResponse,
            isAuth: boolean,
            isRegistration: boolean,
        }
    },
    isAuth: {
        isAuth: boolean,
    },
    isRegistration: {
        isRegistration: boolean
    },
    isLoading: {
        isLoading: boolean,
    },
    isError: {
        isError: boolean
    },
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

