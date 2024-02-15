import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

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
    const [mainData, setMainData] = useState("");
    const [currentPage, setCurrentPage] = useState("1");
    const [dataIsReady, setDataIsReady] = useState(false);
    useEffect(() => {
        fetch(process.env.REACT_APP_STATE1 + "/products/listofgames", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({index: currentPage})
        })
            .then(r => r.json())
            .then(resp => {
                setMainData(resp);
                setDataIsReady(true);
            })
            .catch(err => {
                console.log(err)
            })

    }, [currentPage])

    return (
        <div className={!dataIsReady ? "loader" : ""}>
            {
                dataIsReady ?
                    <div>
                        {/*<button onClick={(event) => gamesData.sortByGenre(event.target.innerText)}>Action</button>*/}
                        {/*<button onClick={(event) => gamesData.sortByGenre(event.target.innerText)}>Unique</button>*/}
                        {/*<button onClick={(event) => gamesData.sortByGenre(event.target.innerText)}>Sport</button>*/}
                        {/*<button onClick={(event) => gamesData.sortByGenre(event.target.innerText)}>Unique</button>*/}
                        {/*<button onClick={(event) => gamesData.sortByGenre(event.target.innerText)}>Driving/Racing</button>*/}
                        <div onClick={(event) => {
                            setDataIsReady(false);
                            setCurrentPage(event.target.innerText);
                        }}>
                            <button>1</button>
                            <button>2</button>
                        </div>
                        <ul>
                            {mainData.map((el, i) => {
                                const mainId = i + 1;
                                const readyTitle = el.title.includes('&#x27;') ? el.title.replace(/&#x27;/g, `'`) : el.title;
                                return <li key={mainId}>
                                    <Link to={mainId + ""} state={{curTitle: readyTitle}}>
                                        {readyTitle}
                                        <img src={el.img} alt="" style={{width: "100px"}}/>
                                    </Link>
                                </li>
                            })}
                        </ul>
                    </div> :
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
            }
        </div>
    );
}

export default Games;