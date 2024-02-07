import {useContext, useState} from "react";
import dataReader from "../tools_dir/dataReader";
import DataContext from "../tools_dir/context";

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
    const mainData = useContext(DataContext);
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
                {dataReader(mainData.gData.games[currentPage])}
            </ul>
        </div>
    );
}

export default Games;