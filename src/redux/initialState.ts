export interface IInitialState {
    isAuth: boolean;
    isRegisterSuccess: boolean;
    token: string;
}
const initialState: IInitialState = {
    isAuth: false,
    isRegisterSuccess: false,
    token: '',
};

export default initialState;
