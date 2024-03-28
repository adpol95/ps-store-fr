import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

//new Object({title: el[0], ...JSON.parse(el[1])}) Шаблон для отправки на бэк
function GamePage() {
    const auth = useAuthUser();
    const isAuth = useIsAuthenticated();
    const {state} = useLocation();
    const [gameData, setGameData] = useState("");
    const [dataIsReady, setDataIsReady] = useState(false);
    const [cartIsReady] = useState(isAuth() ? !auth.cart.some(el => el.title === state.curTitle) : !JSON.parse(localStorage.getItem(state.curTitle)));
    const [favGame, setFavGame] = useState({});
    const navigate = useNavigate();
    const [addToCart, setAddToCart] = useState(false);
    const isYouHaveIt = isAuth() ? auth.ownership.games.some(el => el.name === state.curTitle) : "";
    const signIn = useSignIn();
    const authHeader = useAuthHeader();
    useEffect(() => {
        if (Object.values(favGame).length) {
            if (auth.favorite.games.every(el => el.title !== favGame.title)) {
                fetch(process.env.REACT_APP_STATE1 + "/authorization/" + auth["_id"], {
                    method: "PATCH", // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({
                        favorite: {
                            ...auth.favorite,
                            games: [...auth.favorite.games, favGame]
                        }
                    })
                })
                    .then(resp => {
                        signIn({
                            auth: {
                                token: authHeader.slice(7),
                                type: 'Bearer',
                            },
                            // refresh: response.refToken,
                            userState: {
                                ...auth,
                                favorite: {
                                    ...auth.favorite,
                                    games: [...auth.favorite.games, favGame]
                                }
                            }
                        })
                        alert(favGame.title + " has been added to your list of favorite studios");
                        console.log(resp);
                        navigate("/psn");
                        window.location.reload();
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else alert(favGame.title + " was already added to your list of favorite studios")
        }
    }, [favGame])
    useEffect(() => {
        fetch(process.env.REACT_APP_STATE1 + "/newsAndProducts/page", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({type: "games", name: state.curTitle})
        })
            .then(r => r.json())
            .then(resp => {
                setGameData(resp[0]);
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
                                img: gameData.img,
                                amount: 1,
                                _id: gameData["_id"],
                                type: "Games",
                                Age: gameData.Age,
                                Price: gameData.Price
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
                                        img: gameData.img,
                                        amount: 1,
                                        _id: gameData["_id"],
                                        type: "Games",
                                        Age: gameData.Age,
                                        Price: gameData.Price
                                    }
                                ]
                            }
                        })
                        alert("Game is added in basket")
                        console.log(res)
                        // navigate("/psn");
                        window.location.reload();
                    })
                    .catch(err => console.log(err))
            } else {
                window.localStorage.setItem(state.curTitle, JSON.stringify({
                    title: state.curTitle,
                    img: gameData.img,
                    amount: 1,
                    _id: gameData["_id"],
                    type: "Games",
                    Age: gameData.Age,
                    Price: gameData.Price
                }));
                window.location.reload();
            }
        }
    }, [addToCart]);

    if (!dataIsReady) return (
        <div className="loader">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>)

    else return (
        <div className="game-list">
            <div className="game-list__top" style={{backgroundImage: `url(${gameData.BackgroundImg})`}}>
                <div>
                    <h3>{state.curTitle}</h3>
                </div>
            </div>
            <div className="game-list__page-in">
                <div className="game-list__page-in-top">
                    <div className="game-list__page-in-top--left-side">
                        <img src={gameData.Cover} alt=""/>
                        <div className="game-list__page-in-top--img-platform">
                            {gameData.Platform}
                        </div>
                    </div>
                    <div className="game-list__page-in-top--right-side">
                        <div className="game-list__page-in-top--developer">
                            {gameData.Developer}
                        </div>
                        <div className="game-list__page-in-top--title"><h1>{state.curTitle}</h1></div>
                        <div className="game-list__page-in-top--price">{gameData.Price}</div>
                        <div className="game-list__page-in-top--rating">
                            Rating: <span>{gameData.Rating + " / 5"}</span>
                        </div>
                        <div className="game-list__page-in-top--compat">
                            <ul>
                                {gameData.Compatibility.map((el, i) => <li key={i * 76}>
                                    {el}
                                </li>)}
                            </ul>
                        </div>
                        <div className="game-list__page-in-top--btn-container">
                            <div className="game-list__page-in-top--add-to-cart">
                                {cartIsReady ? <button onClick={() => setAddToCart(true)}
                                                       disabled={isYouHaveIt}>{isYouHaveIt ? "You already have this product" : "Add to Cart"}</button> :
                                    <Link to="/basket">
                                        <button>To Cart</button>
                                    </Link>}
                            </div>
                            <div className="game-list__page-in-top--add-to-fav">
                                <button onClick={() => setFavGame({
                                    "_id": gameData["_id"],
                                    img: gameData.img,
                                    title: state.curTitle
                                })}>
                                    &#x2764;
                                </button>
                                <div className="game-list__page-in-top--atf-descript">
                                    Add this product to your favorite
                                </div>
                            </div>
                        </div>

                        <div className="game-list__page-in-top--bottom-container">
                            <div className="game-list__page-in--additional">
                                <table>
                                    {
                                        gameData.AdditionalInfo.keys.map((el, i) => <tr key={(i + 1) * 76}>
                                            <th>{el}</th>
                                            <th>{gameData.AdditionalInfo.values[i]}</th>
                                        </tr>)
                                    }
                                </table>
                            </div>
                            <div className="game-list__page-in-top--child">
                                <img src={gameData.Age.ESRBImg} alt=""/>
                                <div className="game-list__page-in-top--child-descript">
                                    {gameData.Age.TopDescipt}
                                </div>
                                <div className="game-list__page-in-top--child-descript">
                                    {gameData.Age.BottomDescipt}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="game-list__page-in--decription">
                    <h3>Description</h3>
                    <div className="game-list__page-in--decription--text">
                        {gameData.GameInfo.map(el => <div>{el}</div>)}
                    </div>
                </div>
            </div>
        </div>)

}

export default GamePage;
