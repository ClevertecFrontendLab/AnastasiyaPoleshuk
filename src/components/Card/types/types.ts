export interface ICardInfoMock {
    id: number,
    img: string[],
    rating: string,
    title: string,
    author: string,
    isBooked: boolean,
    busyUntil: string,
    category: string,
}

export interface IBookInfoMock extends ICardInfoMock {
    about: string,
    publishing: string,
    year: string,
    pages: string,
    binding: string,
    format: string,
    genre: string,
    weight: string,
    ISBN: string,
    manufacturer: string,
    feedbacks: IFeedback[],
}

export interface IFeedback {
    id?: number,
    name: string,
    date: string,
    rating: string,
    comment: string
}
