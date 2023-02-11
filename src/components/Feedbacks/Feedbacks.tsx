import userAvatarPath from '../../assets/userAvatar.png';
import { IBookInfoMock, IFeedback } from '../Card/types/types';

import './Feedbacks.scss';

interface IProps {
    book: IBookInfoMock;
}

export const Feedbacks = (props: IProps) => {
    const { book } = props;

    return (
        <details className='feedbacks__details' open={true} data-test-id='button-hide-reviews'>
            <summary className="feedbacks__title">
                Отзывы
                <span className="feedbacks__count">{book.feedbacks.length}</span>
            </summary>
            <div className="feedbacks__wrap">
                {
                    book.feedbacks.map((feedback: IFeedback) => <div className="feedback" key={feedback.id}>
                        <div className="feedback__header">
                            <img src={userAvatarPath} alt="аватар" className="feedback__user-img" />
                            <div className="feedback__header-info">
                                <div className="feedback__user-name">{feedback.name}</div>
                                <div className="feedback__date">{feedback.date}</div>
                            </div>
                        </div>
                        <div className='rating__stars'>
                            <i className="star-fill" />
                            <i className="star-fill" />
                            <i className="star-fill" />
                            <i className="star-fill" />
                            <i className="star" />
                        </div>
                        <p className="feedback__text">{feedback.comment}</p>
                    </div>)
                }
            </div>
        </details>
    )
}
