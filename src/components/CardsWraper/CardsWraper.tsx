import { cardInfoMock } from '../../utils/CardsInfoMock';
import { Card } from '../Card/Card';
import { IBookInfoMock } from '../Card/types/types';

import './CardsWraper.scss';

export const CardsWraper = () => (
    <section className="cards-wraper">
        {
            cardInfoMock.map((item: IBookInfoMock) => <Card
                key={item.id}
                id={item.id}
                img={item.img}
                rating={item.rating}
                title={item.title}
                author={item.author}
                isBooked={item.isBooked}
                busyUntil={item.busyUntil}
                category={item.category}
            />)
        }
    </section>
)
