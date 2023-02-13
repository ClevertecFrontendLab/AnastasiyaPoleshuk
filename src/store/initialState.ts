export const initialState = {
    books: {
        books: [],
        book: {
            id: 0,
            title: "",
            rating: 0,
            issueYear: "",
            description: "",
            publish: "",
            pages: "",
            cover: "",
            weight: "",
            format: "",
            ISBN: "",
            producer: "",
            authors: [],
            images: [
                {
                    url: ""
                },
            ],
            categories: [ 'i', 'p' ],
            comments: [
                {
    	            id: 0,
                    rating: 0,
                    text: "",
                    createdAt: "",
                    user: {
	                commentUser: 0,
                        firstName: "",
                        lastName: "",
                        avatarUrl: ""
                    }
                },
            ],
            booking: {
 	        	id: 0,
                order: false,
                dateOrder: "",
                customerId: 0,
    	        customerFirstName: "",
                customerLastName: ""
            },
            delivery: {
 	            id: 0,
                handed: false,
                dateHandedFrom: "",
	            dateHandedTo: "",
                recipientId: 0,
	            recipientFirstName: "",
    	        recipientLastName: ""
            },
            histories: [
                {
                    id: 0,
                    userId: 0
                },
            ]
        }
    },
    error: {
        data: null,
        error: {
            status: 0,
            name: '',
            message: '',
            details: {}
        }
    },
    categories: {
        categories: []
    },
}
