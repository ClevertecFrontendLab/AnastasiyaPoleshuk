import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTrainingInfo } from '../../api/getTrainingInfo';
import { getTrainingList } from '../../api/getTrainingList';
import { createTraining } from '../../api/createTraining';
import { ICreateTrainingRequest } from '../../types/apiTypes';
import { updateTraining } from '../../api/updateTraining';

export const GetTrainingInfoThunk = createAsyncThunk(
    'calendar/getTrainingInfo',
    async (accessToken: string) => {
        const response = await getTrainingInfo(accessToken);
        return response;
    },
);

export const GetTrainingListThunk = createAsyncThunk('calendar/getTrainingList', async () => {
    const response = await getTrainingList();
    return response;
});

export const CreateTrainingThunk = createAsyncThunk(
    'calendar/createTraining',
    async (request: ICreateTrainingRequest) => {
        const response = await createTraining(request);
        return response;
    },
);

export const UpdateTrainingThunk = createAsyncThunk(
    'calendar/updateTraining',
    async (request: ICreateTrainingRequest) => {
        const response = await updateTraining(request);
        return response;
    },
);
