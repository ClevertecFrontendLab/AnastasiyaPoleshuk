export interface IGetBooks {
    issueYear: string,
    rating: number,
    title: string,
    authors: string[],
    image: IBookImage,
    categories: string [],
    id: number,
    booking: IBooking,
    delivery: IDelivery,
    histories: IHistories[],
}

export interface IGetBook {
 	id: number,
    title: string,
    rating: number,
    issueYear: string,
    description: string,
    publish: string,
    pages: string,
    cover: string,
    weight: string,
    format: string,
    ISBN: string,
    producer: string,
    authors: string[],
    images: IBookImage[],
    categories: string[],
    comments: IBookComments[],
    booking: IBooking,
    delivery: IDelivery,
    histories: IHistories [],
}

export interface IError {
 	data: null;
    error: {
        status: number,
        name: string,
        message: string,
        details: object,
    }
}

export interface ICategories {
 	name: string,
	path: string,
   	id: number,
}

// ============================================

export interface IBooking {
 	id: number,
    order: boolean,
    dateOrder: string,
    customerId: number,
	customerFirstName: string,
    customerLastName: string
}

export interface IDelivery {
 	id: number,
    handed: boolean,
    dateHandedFrom: string,
	dateHandedTo: string,
    recipientId: number,
	recipientFirstName: string,
    recipientLastName: string,
}

export interface IHistories {
 	id: number,
    userId: number,
}

export interface IBookImage {
    url: string
}

export interface IBookComments {
	id: number,
    rating: number,
    text: string,
    createdAt: string,
    user: IBookCommentsUser,
}

export interface IBookCommentsUser {
    commentUserId: number,
    firstName: string,
    lastName: string,
    avatarUrl: string,
}
