import { IGetBooks, IGetBook, ICategories, IError } from "./apiTypes";

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
