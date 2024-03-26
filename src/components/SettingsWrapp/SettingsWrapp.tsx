import { Button, Switch, Tooltip } from 'antd';
import freeTariff from '../../../public/assets/png/free.png';
import PROTariffDisable from '../../../public/assets/png/pro disable.png';
import PROTariffAble from '../../../public/assets/png/pro able.png';
import './SettingsWrapp.scss';
import { CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import CONSTANTS from '@utils/constants';
import { push } from 'redux-first-history';
import { AppContext } from '../../context/AppContext';
import { UpdateUserThunk } from '@redux/thunk/userThunks';

export const SettingsWrapp = () => {
    const [isPROActive, setIsPROActive] = useState(false);
    const { user } = useAppSelector((state) => state.user);

    const { openModal, setTariffDrawerStatus } = useContext(AppContext);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user.tariff) {
            setIsPROActive(true);
        }
    }, []);

    return (
        <div className='settings-wrapp'>
            <h4 className='settings-wrapp__title'>Мой тариф</h4>

            <div className='tariff__content'>
                <div className='tariff__card card'>
                    <header className='card__header'>
                        <h5 className='card__header-title'>FREE tarif</h5>
                        <Button
                            type='link'
                            className='card__header-button'
                            onClick={() => setTariffDrawerStatus(true)}
                        >
                            Подробнее
                        </Button>
                    </header>
                    <img src={freeTariff} alt='free tariff image' className='card__img' />
                    <footer className='card__footer'>
                        <span className='card__footer-text'>активен</span> <CheckOutlined />
                    </footer>
                </div>
                <div className='tariff__card card'>
                    <header className='card__header'>
                        <h5 className='card__header-title'>PRO tarif</h5>
                        <Button
                            type='link'
                            className='card__header-button'
                            onClick={() => setTariffDrawerStatus(true)}
                        >
                            Подробнее
                        </Button>
                    </header>
                    <img
                        src={isPROActive ? PROTariffAble : PROTariffDisable}
                        alt='free tariff image'
                        className='card__img'
                    />
                    <footer className='card__footer'>
                        {isPROActive ? (
                            <span className='card__footer-text'>Активен до {'вставить дату'}</span>
                        ) : (
                            <Button type='primary' className='card__footer-button'>
                                Активировать
                            </Button>
                        )}
                    </footer>
                </div>
            </div>
            <div className='advantages__box'>
                <div className='advantage-item'>
                    <div className='advantage-item__title-box'>
                        <p className='advantage-item__title'>Открыт для совместных тренировок</p>
                        <Tooltip
                            placement='bottomLeft'
                            title={
                                'включеная функция позволит участвовать в совместных тренировках'
                            }
                        >
                            <ExclamationCircleOutlined />
                        </Tooltip>
                    </div>
                    <Switch
                        defaultChecked
                        onChange={(checked) =>
                            dispatch(
                                UpdateUserThunk({
                                    email: user.email,
                                    readyForJointTraining: checked,
                                }),
                            )
                        }
                    />
                </div>
                <div className='advantage-item'>
                    <div className='advantage-item__title-box'>
                        <p className='advantage-item__title'>Уведомления</p>
                        <Tooltip
                            placement='bottomLeft'
                            title={'включеная функция позволит получать уведомления об активностях'}
                        >
                            <ExclamationCircleOutlined />
                        </Tooltip>
                    </div>
                    <Switch
                        onChange={(checked) =>
                            dispatch(
                                UpdateUserThunk({
                                    email: user.email,
                                    sendNotification: checked,
                                }),
                            )
                        }
                    />
                </div>
                <div className='advantage-item'>
                    <div className='advantage-item__title-box'>
                        <p
                            className={`advantage-item__title ${
                                isPROActive ? '' : 'advantage-item__disabled'
                            }`}
                        >
                            Темная тема
                        </p>
                        <Tooltip
                            placement='bottomLeft'
                            title={'темная тема доступна для PRO tarif'}
                        >
                            <ExclamationCircleOutlined />
                        </Tooltip>
                    </div>
                    <Switch disabled={isPROActive ? false : true} />
                </div>

                <div className='feedbacks-btns__wrapp'>
                    <Button
                        type='primary'
                        onClick={() => openModal(CONSTANTS.CREATE_FEEDBACK_MODAL)}
                        className='feedbacks-wrapp__btn'
                        data-test-id='write-review'
                    >
                        Написать отзыв
                    </Button>
                    <Button
                        type='link'
                        onClick={() => dispatch(push(CONSTANTS.ROUTER__PATH.FEEDBACKS__PATH))}
                        className='feedbacks-wrapp__btn'
                        data-test-id='all-reviews-button'
                    >
                        Смотреть все отзывы
                    </Button>
                </div>
            </div>
        </div>
    );
};
