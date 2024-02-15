import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

function GamePage() {
    const {state} = useLocation();
    const [gameData, setGameData] = useState("");
    const [dataIsReady, setDataIsReady] = useState(false);
    useEffect(() => {
        fetch(process.env.REACT_APP_STATE1 + "/products/game", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({name: state.curTitle})
        })
            .then(r => r.json())
            .then(resp => {
                setGameData(resp[0].value);
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
