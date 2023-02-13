import './Loader.scss';

export const Loader = () => {
    return (
        <div className="overlay" data-test-id='loader'>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}
