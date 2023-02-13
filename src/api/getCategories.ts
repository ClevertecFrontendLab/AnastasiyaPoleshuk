import axios from 'axios';

import { ICategories, IError } from '../types/apiTypes';
import { CONSTANTS } from '../utils/constants';

export const getCategories = async () => {
    try {
        const { data, status } = await axios.get<ICategories | IError>(
            `${CONSTANTS.URL}/api/categories`,
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
};
