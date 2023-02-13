import axios from 'axios';

import { IError, IGetBook } from '../types/apiTypes';
import { CONSTANTS } from '../utils/constants';

export const getBook = async (id: number) => {
    try {
        const { data, status } = await axios.get<IGetBook | IError>(
            `${CONSTANTS.URL}/api/books/${id}`,
        );
        return { data, status };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const data = error.response?.data;
            const status = error.response?.data.error.status;

            return { data, status };
        } else {
            return {
                data: {
                    data: null,
                    error: {
                        status: 0,
                        name: '',
                        message: '',
                        details: {}
                    }
                },
                status: 0
            }
        }
    }
}
