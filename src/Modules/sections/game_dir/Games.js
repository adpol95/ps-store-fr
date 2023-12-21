import {useContext, useEffect, useState} from "react";
import dataReader from "../dataReader";
import DataContext from "../../context";

function Games() {

    // const [gamesData, setGamesData] = useState({
    //     sortByGenre(genre) {
    //         let sortGames = {};
    //
    //         for (let key3 in this) {
    //             if (this[key3]['Genre:'] === genre) sortGames[key3] = this[key3];
    //         }
    //         setTest(sortGames);
    //     }
    // });
    const gamesData = useContext(DataContext);
    console.log(gamesData)
    const [currentPage, setCurrentPage] = useState(0);

    return (
        <div>
            {/*<button onClick={(event) => gamesData.sortByGenre(event.target.innerText)}>Action</button>*/}
            {/*<button onClick={(event) => gamesData.sortByGenre(event.target.innerText)}>Unique</button>*/}
            {/*<button onClick={(event) => gamesData.sortByGenre(event.target.innerText)}>Sport</button>*/}
            {/*<button onClick={(event) => gamesData.sortByGenre(event.target.innerText)}>Unique</button>*/}
            {/*<button onClick={(event) => gamesData.sortByGenre(event.target.innerText)}>Driving/Racing</button>*/}
            <div onClick={(event) => {
                setCurrentPage(event.target.innerText * 1 - 1)
            }}>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
            </div>
            <ul>
                {dataReader(gamesData.games[currentPage])}
            </ul>
        </div>
    );
}

export default Games;