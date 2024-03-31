import {Link} from "react-router-dom";

function Common(props) {
    return (
        props.data ? <div className="products-list">
                <div className="products-list__top">
                    <div>
                        <h3>Accessories</h3>
                    </div>
                </div>
                <div className="products-list__middle">
                    {props.mainData.map(el => {
                        const readyTitle = el.title.includes('&#x27;') ? el.title.replace(/&#x27;/g, `'`) : el.title
                        return <Link to={el["_id"]} state={{curTitle: readyTitle}} className="game-pack">
                            <div className="game-pack__top">
                                <img src={el.img} alt=""/>
                                <div className="game-pack__price">
                                    {el.Price}
                                </div>
                            </div>
                            <div className="game-pack__down">
                                <div className="game-pack__down--left">
                                    <h4 className="game-pack__down--genre">
                                        {el.Genre}
                                    </h4>
                                    <h4 className="game-pack__down--title">
                                        {readyTitle}
                                    </h4>
                                </div>
                                <div className="game-pack__down--right">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24"
                                         fill="#F9F7F0">
                                        <path
                                            d="M5 22h14a2 2 0 0 0 2-2V9a1 1 0 0 0-1-1h-3v-.777c0-2.609-1.903-4.945-4.5-5.198A5.005 5.005 0 0 0 7 7v1H4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2zm12-12v2h-2v-2h2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-2 3h2v2H7v-2z"></path>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    })}
                </div>

            </div>
            :
            <div className="loader">
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

    );
}

export default Common;