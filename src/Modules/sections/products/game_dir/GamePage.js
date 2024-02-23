import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function GamePage() {
    const {state} = useLocation();
    const [gameData, setGameData] = useState("");
    const [dataIsReady, setDataIsReady] = useState(false);
    const [favGame, setFavGame] = useState({});
    const auth = useAuthUser().currentProfile;
    const navigate = useNavigate();
    useEffect(() => {
        if (Object.values(favGame).length) {
            if (auth.favorite.games.every(el => el.title !== favGame.title)) {
                fetch(process.env.REACT_APP_STATE1 + "/authorization/" + auth["_id"], {
                    method: "PATCH", // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({favorite: {...auth.favorite, games: [...auth.favorite.games, favGame]}})
                })
                    .then(resp => {
                        document.cookie = "_auth_state=" + JSON.stringify({
                            currentProfile: {
                                ...auth,
                                favorite: {...auth.favorite, games: [...auth.favorite.games, favGame]}
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
