import {useLocation} from "react-router-dom";

function GamePage() {
    const {state} = useLocation();
    const gameData = state.dataAboutGame[1]

    return (
        <div>
            <div>
                <img src={gameData.BackgroundImg} alt="background img error" width={"100%"}/>
            </div>
            <div>
                <h1>
                    {state.dataAboutGame[0]}
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
        </div>
    )
}

export default GamePage;