import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

//new Object({title: el[0], ...JSON.parse(el[1])}) Шаблон для отправки на бек
function GamePage() {
    const auth = useAuthUser();
    const isAuth = useIsAuthenticated();
    const {state} = useLocation();
    const [gameData, setGameData] = useState("");
    const [dataIsReady, setDataIsReady] = useState(false);
    const [cartIsReady, setCartIsReady] = useState(!JSON.parse(localStorage.getItem(state.curTitle)));
    const [favGame, setFavGame] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        if (Object.values(favGame).length) {
            if (auth.currentProfile.favorite.games.every(el => el.title !== favGame.title)) {
                fetch(process.env.REACT_APP_STATE1 + "/authorization/" + auth.currentProfile["_id"], {
                    method: "PATCH", // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({
                        favorite: {
                            ...auth.currentProfile.favorite,
                            games: [...auth.currentProfile.favorite.games, favGame]
                        }
                    })
                })
                    .then(resp => {
                        document.cookie = "_auth_state=" + JSON.stringify({
                            currentProfile: {
                                ...auth.currentProfile,
                                favorite: {
                                    ...auth.currentProfile.favorite,
                                    games: [...auth.currentProfile.favorite.games, favGame]
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

    return (
        <div className={!dataIsReady ? "loader" : ""}>
            {dataIsReady ?
                <div>
                    <div>
                        <img src={gameData.BackgroundImg} alt="background img error" width={"100%"}/>
                    </div>
                    <div>
                        <h1>
                            {state.curTitle}
                        </h1>
                        <div>
                            {gameData.Developer}
                        </div>
                        <div>
                            {gameData.Rating}
                        </div>
                        <div>
                            {gameData.Price}
                        </div>
                        <div onClick={() => {

                            if (isAuth()) {
                                // document.cookie = "_auth_state=" + JSON.stringify({
                                //     ...auth,
                                //     activeGoods: {
                                //         ...auth.currentProfile.activeGoods,
                                //         [state.curTitle]: {...gameData, amount: 1}
                                //     }
                                // })
                                // fetch(process.env.REACT_APP_STATE1 + "/authorization/" + auth.currentProfile["_id"], {
                                //     method: "PATCH", // *GET, POST, PUT, DELETE, etc.
                                //     mode: "cors", // no-cors, *cors, same-origin
                                //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                                //     credentials: "same-origin", // include, *same-origin, omit
                                //     headers: {
                                //         "Content-Type": "application/json",
                                //         // 'Content-Type': 'application/x-www-form-urlencoded',
                                //     },
                                //     redirect: "follow", // manual, *follow, error
                                //     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                                //     body: JSON.stringify({
                                //         activeGoods: {
                                //             ...auth.currentProfile.activeGoods,
                                //             [state.curTitle]: {...gameData, amount: 1}
                                //         }
                                //     })
                                // })
                                //     .then(res => {
                                //         console.log(res)
                                //     })
                                //     .catch(err => console.log(err))
                            } else window.localStorage.setItem(state.curTitle, JSON.stringify({
                                title: state.curTitle,
                                img: gameData.img,
                                amount: 1,
                                _id: gameData["_id"],
                                type: "Games",
                                Age: gameData.Age,
                                Price: gameData.Price
                            }));
                            window.location.reload();
                        }}>
                            {cartIsReady ? <button>Add to Cart</button> : <Link to="/basket">
                                <button>To Cart</button>
                            </Link>}
                        </div>
                        <div>
                            <ul>
                                {gameData.Compatibility.map((el, i) => <li key={i * 76}>
                                    {el}
                                </li>)}
                            </ul>
                        </div>
                        <div>
                            <img src={gameData.Age.ESRBImg} alt=""/>
                            <div>
                                {gameData.Age.TopDescipt}
                            </div>
                            <div>
                                {gameData.Age.BottomDescipt}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2>Game info</h2>
                        <div>
                            {gameData.GameInfo}
                        </div>
                    </div>
                    <div>
                        <table>
                            {
                                gameData.AdditionalInfo.keys.map((el, i) => <tr key={(i + 1) * 76}>
                                    <th>{el}</th>
                                    <th>{gameData.AdditionalInfo.values[i]}</th>
                                </tr>)
                            }
                        </table>
                    </div>
                    <div>
                        <p>Add this game to your favorite</p>
                        <button onClick={() => setFavGame({
                            "_id": gameData["_id"],
                            img: gameData.img,
                            title: state.curTitle
                        })}>
                            Add
                        </button>
                    </div>
                </div> :
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>}
        </div>
    )
}

export default GamePage;
