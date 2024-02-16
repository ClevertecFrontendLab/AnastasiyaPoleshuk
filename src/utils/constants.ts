const CONSTANTS = {
    URL: 'https://marathon-api.clevertec.ru/',
    ROUTER__PATH: {
        AUTH__PATH: '/auth',
        MAIN__PATH: '/main',
        CHANGE_PASSWORD__PATH: '/auth/change-password',
        RESULT: {
            SUCCESS: {
                SUCCESS__PATH: '/result/success',
                CHANGE_PASSWORD__PATH: '/result/success-change-password',
            },
            ERROR: {
                ERROR__PATH: '/result/error ',
                USER_EXIT__PATH: '/result/error-user-exist',
                LOGIN__PATH: '/result/error-login',
                CHECK_EMAIL_NO_EXIST__PATH: '/result/error-check-email-no-exist',
                CHECK_EMAIL__PATH: '/result/error-check-email',
                CHANGE_PASSWORD__PATH: '/result/error-change-password',
            },
        },
    },
};

export default CONSTANTS;
