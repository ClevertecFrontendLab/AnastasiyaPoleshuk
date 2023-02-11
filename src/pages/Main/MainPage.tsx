import { CardsWraper } from '../../components/CardsWraper/CardsWraper';
import { Navigation } from '../../components/Navigation/Navigation';

import './MainPage.scss';

export const MainPage = () => (
    <section className="content-wrap">
        <Navigation />
        <CardsWraper />
    </section>
);
