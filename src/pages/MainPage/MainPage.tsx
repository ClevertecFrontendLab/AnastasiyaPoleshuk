import React, { useState } from 'react';

import './MainPage.scss';
import { Header } from '@components/header/Header';
import { NavLink } from 'react-router-dom';
import { Footer } from '@components/footer/Footer';

export const MainPage: React.FC = () => {
    return (
        <div className='main-page main'>
            <Header />
            <main className='main__section'>
                <div className='main__articles-wrapp'>
                    <article className='main__list'>
                        С CleverFit ты сможешь:
                        <ul>
                            <li className='main__list-item'>
                                — планировать свои тренировки на календаре, выбирая тип и уровень
                                нагрузки;
                            </li>
                            <li className='main__list-item'>
                                — отслеживать свои достижения в разделе статистики, сравнивая свои
                                результаты с нормами и рекордами;
                            </li>
                            <li className='main__list-item'>
                                — создавать свой профиль, где ты можешь загружать свои фото, видео и
                                отзывы о тренировках;
                            </li>
                            <li className='main__list-item'>
                                — выполнять расписанные тренировки для разных частей тела, следуя
                                подробным инструкциям и советам профессиональных тренеров.
                            </li>
                        </ul>
                    </article>
                    <article className='main__article-last'>
                        CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса.
                        Не откладывай на завтра — начни тренироваться уже сегодня!
                    </article>
                    <div className='main__cards-block'>
                        <div className='card'>
                            <h5 className='card__title'>Расписать тренировки</h5>
                            <NavLink className='card__link' to='/'>
                                Тренировки
                            </NavLink>
                        </div>
                        <div className='card'>
                            <h5 className='card__title'>Назначить календарь</h5>
                            <NavLink className='card__link' to='/'>
                                Календарь
                            </NavLink>
                        </div>
                        <div className='card'>
                            <h5 className='card__title'>Заполнить профить</h5>
                            <NavLink className='card__link' to='/'>
                                Профить
                            </NavLink>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </div>
    );
};
