import altImg from '../../assets/userAvatar.png';
import { IBookComments } from '../../types/apiTypes';
import { CONSTANTS } from '../../utils/constants';

import './Feedbacks.scss';

interface IProps {
    comments: IBookComments[];
}

export const Feedbacks = (props: IProps) => {
    const { comments } = props;


    return (
        <details className='feedbacks__details' open={true} data-test-id='button-hide-reviews'>
            <summary className="feedbacks__title">
                Отзывы
                <span className="feedbacks__count">{
                    comments ? comments.length : 0
                }</span>
            </summary>
            <div className="feedbacks__wrap">
                {
                    comments &&
                    comments.map((comment: IBookComments) => <div className="feedback" key={comment.id}>
                        <div className="feedback__header">
                            <img src={
                                comment.user.avatarUrl ?
                                    `${CONSTANTS.URL}${comment.user.avatarUrl}`
                                    : altImg
                            } alt="аватар" className="feedback__user-img" />
                            <div className="feedback__header-info">
                                <div className="feedback__user-name">{`${comment.user.firstName} ${comment.user.lastName}`}</div>
                                <div className="feedback__date">{comment.createdAt}</div>
                            </div>
                        </div>
                        <div className='rating__stars'>
                            <i className="star-fill" />
                            <i className="star-fill" />
                            <i className="star-fill" />
                            <i className="star-fill" />
                            <i className="star" />
                        </div>
                        <p className="feedback__text">{comment.text}</p>
                    </div>)
                }
            </div>
        </details>
    )
}
