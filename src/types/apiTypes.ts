export interface IAuthRequest {
    email: string;
    password: string;
    remember?: boolean;
}

export interface ILoginResponse {
    accessToken: string;
}

export interface IRequestError {
    statusCode: number;
    error: string;
    message: string;
}
