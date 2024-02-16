export interface IStore {
    isAuth: {
        isAuth: boolean;
    };
    isRegisterSuccess: boolean;
    isLoading: {
        isLoading: boolean;
    };
    isError: {
        isError: boolean;
    };
    token: {
        token: string;
    };
}
