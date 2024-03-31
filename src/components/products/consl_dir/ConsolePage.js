import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function ConsolePage() {
    const {state} = useLocation();
    const auth = useAuthUser();
    const isAuth = useIsAuthenticated();
    const [cartIsReady, setCartIsReady] = useState(isAuth() ? !auth.cart.some(el => el.title === state.curTitle) : !JSON.parse(localStorage.getItem(state.curTitle)));
    const [addToCart, setAddToCart] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);
    const [datas, setDatas] = useState([]);
    const [dataIsReady, setDataIsReady] = useState(false);
    const isYouHaveIt = isAuth() ? auth.ownership.consoles.some(el => el.name === state.curTitle) : "";
    const signIn = useSignIn();
    const authHeader = useAuthHeader();
    useEffect(() => {
        fetch(process.env.REACT_APP_STATE1 + "/newsAndProducts/page", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({type: "consoles", name: state.curTitle})
        })
            .then(r => r.json())
            .then(resp => {
                setDatas(resp)
                setDataIsReady(true);
            })
            .catch(err => {
                console.log(err)
            })

    }, [])
    useEffect(() => {
        if (addToCart) {
            if (isAuth()) {
                fetch(process.env.REACT_APP_STATE1 + "/authorization/" + auth["_id"], {
                    method: "PATCH", // *GET, POST, PUT, DELETE, etc.
                    mode: "cors", // no-cors, *cors, same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, *same-origin, omit
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect: "follow", // manual, *follow, error
                    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify({
                        cart: [
                            ...auth.cart,
                            {
                                title: state.curTitle,
                                img: datas.img,
                                amount: 1,
                                _id: datas["_id"],
                                type: "Consoles",
                                Age: undefined,
                                Price: datas.price
                            }
                        ]
                    })
                })
                    .then(res => {
                        signIn({
                            auth: {
                                token: authHeader.slice(7),
                                type: 'Bearer',
                            },
                            // refresh: response.refToken,
                            userState: {
                                ...auth,
                                cart: [
                                    ...auth.cart,
                                    {
                                        title: state.curTitle,
                                        img: datas.img,
                                        amount: 1,
                                        _id: datas["_id"],
                                        type: "Consoles",
                                        Age: undefined,
                                        Price: datas.price
                                    }
                                ]
                            }
                        })
                        alert("Console is added in basket")
                        console.log(res)
                        // navigate("/psn");
                        window.location.reload();
                    })
                    .catch(err => console.log(err))
            } else {
                window.localStorage.setItem(state.curTitle, JSON.stringify({
                    title: state.curTitle,
                    img: datas.img,
                    amount: 1,
                    _id: datas["_id"],
                    type: "Consoles",
                    Age: undefined,
                    Price: datas.price
                }));
                window.location.reload();
            }
        }
    }, [addToCart]);
    return (
        <div onClick={(event) => {
            if (event.target.innerText === '<' && currentPage > 0) {
                setCurrentPage(currentPage - 1)
            } else if (event.target.innerText === '>' && currentPage !== datas.descriptionImgs.length - 1) {
                setCurrentPage(currentPage + 1)
            }
        }} className={!dataIsReady ? "loader" : ""}>
            {dataIsReady ?
                <div className="game-list">
                    <div className="game-list__top">
                        <div>
                            <h3>{state.curTitle}</h3>
                        </div>
                    </div>
                    <div className="game-list__page-in">
                        <div className="game-list__page-in-top">
                            <button>
                                &lt;
                            </button>
                            <img src={datas.descriptionImgs[currentPage]} alt="" style={{width: "300px"}}/>
                            <button>
                                &gt;
                            </button>
                            <div>{datas.previewText}</div>
                            <div>Realise date: {datas.realiseDate}</div>
                            <div>Price: {datas.price}</div>
                            <div>
                                {cartIsReady ? <button onClick={() => setAddToCart(true)}
                                                       disabled={isYouHaveIt}>{isYouHaveIt ? "You already have this product" : "Add to Cart"}</button> :
                                    <Link to="/basket">
                                        <button>To Cart</button>
                                    </Link>}
                            </div>
                            <hr/>
                            <div>
                                <h3>Tearms</h3>
                                <ul>
                                    {datas.terms.map((el, i) => <li key={i * 14}>{el}</li>)}
                                </ul>
                            </div>
                        </div>
                        <div className="game-list__page-in-middle">
                            <ul>
                                {datas.mainText ? datas.mainText.map((el, i) => <li key={i * 114}>
                                        <img src={datas.descriptionImgs[i + 1]} alt="console img error"/>
                                        <h3>
                                            {el.title}
                                        </h3>
                                        <ul>fF
                                            {el.descript.map((el, il) => <li key={il * 221}>{el}</li>)}
                                        </ul>
                                    </li>
                                ) : ""}
                            </ul>
                        </div>
                        <div className="game-list__page-in-down">
                            <h3>
                                {datas.whatInTheBox ? 'What in the box' : ''}
                            </h3>
                            <ul>
                                {datas.whatInTheBox ? datas.whatInTheBox.map((el, i) => <li
                                    key={i * 25}> {el}</li>) : ""}
                            </ul>
                        </div>
                    </div>
                </div> :
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
        </div>
    )
}

export default ConsolePage;
