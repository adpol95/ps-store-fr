import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import dataReader from "../../dataReader";

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
    const [gamesData, setGamesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then((res) => res.json())
            .then((data) => {
                // setGamesData({...gamesData, ...data[0].games});
                setGamesData(data);
            })
    }, [])


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
                {dataReader(gamesData[currentPage])}
            </ul>
        </div>
    );
}

export default Games;