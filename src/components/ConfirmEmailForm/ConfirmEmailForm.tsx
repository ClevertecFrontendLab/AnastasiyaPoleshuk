import { Result } from 'antd';
import './ConfirmEmailForm.scss';
import VerificationInput from 'react-verification-input';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { ConfirmEmailThunk } from '@redux/thunks/ConfirmEmailThunk';
import { useEffect, useState } from 'react';
import CONSTANTS from '@utils/constants';
import { push } from 'redux-first-history';

export const ConfirmEmailForm = () => {
    const [formError, setFormError] = useState(false);
    const { email } = useAppSelector((state) => state.user);
    const { IsConfirmEmailSuccess } = useAppSelector((state) => state.user);
    const { isError } = useAppSelector((state) => state.error);
    const router = useAppSelector((state) => state.router);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const previousLocation = router.previousLocations
            ? router.previousLocations[1].location?.pathname
            : undefined;
        if (previousLocation !== CONSTANTS.ROUTER__PATH.AUTH__PATH) {
            dispatch(push(`${CONSTANTS.ROUTER__PATH.AUTH__PATH}`));
        }
    }, []);

    useEffect(() => {
        if (!IsConfirmEmailSuccess && isError) {
            setFormError(true);
        }
        if (IsConfirmEmailSuccess && !isError) {
            setFormError(false);
            dispatch(
                push(
                    `${CONSTANTS.ROUTER__PATH.AUTH__PATH}${CONSTANTS.ROUTER__PATH.CHANGE_PASSWORD__PATH}`,
                ),
            );
        }
    }, [IsConfirmEmailSuccess, isError]);

    const checkCode = (code: string) => {
        dispatch(
            ConfirmEmailThunk({
                email,
                code,
            }),
        );
    };
    return (
        <Result
            status={formError ? 'error' : 'info'}
            title={
                formError
                    ? 'Неверный код. Введите код для восстановления аккауанта'
                    : 'Введите код для восстановления аккауанта'
            }
            subTitle={`Мы отправили вам на e-mail ${email} шестизначный код. Введите его в поле ниже.`}
            extra={
                <>
                    <VerificationInput
                        validChars='0-9'
                        placeholder=''
                        autoFocus={true}
                        onComplete={(codeString) => checkCode(codeString)}
                        classNames={{
                            character: `verification-input ${
                                formError ? 'verification-input__error' : ''
                            }`,
                        }}
                        inputProps={{ ['data-test-id']: 'verification-input' }}
                    />
                    <p className='confirm-email__text'>Не пришло письмо? Проверьте папку Спам.</p>
                </>
            }
        />
    );
};
