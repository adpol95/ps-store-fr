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
    const [filterOnPrice, setFilterOnPrice] = useState(false);
    const [filterOnDev, setFilterOnDev] = useState(false);
    const [filterOnRating, setFilterOnRating] = useState(false);
    const [filterOnPlatform, setFilterOnPlatform] = useState(false);
    const [filterOnGenre, setFilterOnGenre] = useState(false);
    const [categoryBox, setCategoryBox] = useState("");
    useEffect(() => {
        fetch(process.env.REACT_APP_STATE1 + "/newsAndProducts/listofnewsOrProducts", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({type: "games", index: currentPage})
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

    const filter = (event) => {
        event.preventDefault();
        setDataIsReady(false);
        fetch(process.env.REACT_APP_STATE1 + "/newsAndProducts/listOfNewsOrProducts", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                type: "games",
                filter: {
                    vary: categoryBox,
                    value: event.target.name
                }
            })
        })
            .then(r => r.json())
            .then(resp => {
                setMainData(resp);
                setDataIsReady(true);
            })
            .catch(err => {
                console.log(err)
            })

    }

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
                        <div>
                            Filter
                            <ul>
                                <li key={Math.random() * 100 - 1}>
                                    <div onClick={() => {
                                        setFilterOnPrice(!filterOnPrice)
                                        setCategoryBox("Price");
                                    }}
                                         style={{border: "2px blue solid", borderRadius: "10px"}}>
                                        <p>Price</p>
                                        <img
                                            src={filterOnPrice ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALxJREFUSEvtlNENgzAMRI9NyiZlk7IJm9BNugqblJwUS5YbYvsDqRJYigghuedcHAacHMPJ+rge4FEt3aLWZiyi+AqAzwlACBIFiPhT7SAEiQCsuLjDHbgQD6DFKajPgH0X0gNY8RHAt6bP/qcCu5AjQEuc2gLgOs5xIUeAV60YZsdsJTSAYxoyl/e3Ld+eRUuZzKbDAgTC6voR50fvkG1CLUD3zt0A95f0dxa5GWfKNC3WWpC1KA29Aa5lO8NvJxkxC+GFAAAAAElFTkSuQmCC" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALlJREFUSEvtk9ENgzAMRI9N6CYwCpO0m5RNYJOyCe1JjmSBExupkfhIfgDp8p6xkw6VV1eZjyZwO3y7Fu1ScriwcFDATeAeir+26AVgBrAprSXoAQySPVWYGzLhT4GPSnIUEP4WwWRJcgJuXH4b+OQfJIkWaDgzD6vBpWNqST4CISxVnoUz692Do4TfXKu0pQiPCJjREt0FFx4VWJIQ/IpAS/huDvTqkK18OlXujUwBb8hhUC7YBG4LvwncJBla0VEbAAAAAElFTkSuQmCC"}/>
                                    </div>
                                    {filterOnPrice ?
                                        <div>
                                            <ul onChange={(event) => filter(event)}>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="Free"/>
                                                    <label htmlFor="Free">Free</label>
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="Under1.99"/>
                                                    <label htmlFor="Under1.99">Under 1.99</label>
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="2-5"/>
                                                    <label htmlFor="2-5">2.00-5.00</label>
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="5-10"/>
                                                    <label htmlFor="5-10">5.00-10.00</label>
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="10-50"/>
                                                    <label htmlFor="10-50">10.00-50.00</label>
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="50-100"/>
                                                    <label htmlFor="50-100">50.00-100.00</label>
                                                </li>
                                            </ul>
                                        </div> : ""}
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <div onClick={() => {
                                        setFilterOnDev(!filterOnDev)
                                        setCategoryBox("Developer");
                                    }}
                                         style={{border: "2px blue solid", borderRadius: "10px"}}>
                                        <p>Developer</p>
                                        <img
                                            src={filterOnDev ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALxJREFUSEvtlNENgzAMRI9NyiZlk7IJm9BNugqblJwUS5YbYvsDqRJYigghuedcHAacHMPJ+rge4FEt3aLWZiyi+AqAzwlACBIFiPhT7SAEiQCsuLjDHbgQD6DFKajPgH0X0gNY8RHAt6bP/qcCu5AjQEuc2gLgOs5xIUeAV60YZsdsJTSAYxoyl/e3Ld+eRUuZzKbDAgTC6voR50fvkG1CLUD3zt0A95f0dxa5GWfKNC3WWpC1KA29Aa5lO8NvJxkxC+GFAAAAAElFTkSuQmCC" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALlJREFUSEvtk9ENgzAMRI9N6CYwCpO0m5RNYJOyCe1JjmSBExupkfhIfgDp8p6xkw6VV1eZjyZwO3y7Fu1ScriwcFDATeAeir+26AVgBrAprSXoAQySPVWYGzLhT4GPSnIUEP4WwWRJcgJuXH4b+OQfJIkWaDgzD6vBpWNqST4CISxVnoUz692Do4TfXKu0pQiPCJjREt0FFx4VWJIQ/IpAS/huDvTqkK18OlXujUwBb8hhUC7YBG4LvwncJBla0VEbAAAAAElFTkSuQmCC"}/>
                                    </div>
                                    {filterOnDev ?
                                        <div>
                                            <ul onChange={(event) => filter(event)}>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="Sony Interactive Entertainment"/>
                                                    <label htmlFor="Sony Interactive Entertainment">Sony Interactive
                                                        Entertainment</label>
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="Epic Games"/>
                                                    <label htmlFor="Epic Games">Epic Games</label>
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="2K"/>
                                                    <label htmlFor="2K">2K</label>
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="Activision"/>
                                                    <label htmlFor="Activision">Activision</label>
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="Electronic Arts Inc"/>
                                                    <label htmlFor="Electronic Arts Inc">Electronic Arts Inc</label>
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="Ubisoft Entertainment"/>
                                                    <label htmlFor="Ubisoft Entertainment">Ubisoft Entertainment</label>
                                                    Games
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="Rockstar Games"/>
                                                    <label htmlFor="Rockstar Games">Rockstar Games</label>
                                                    Games
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="Blizzard Entertainment, Inc."/>
                                                    <label htmlFor="Blizzard Entertainment, Inc.">Blizzard
                                                        Entertainment, Inc.</label>
                                                    Games
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="Warner Bros. Interactive"/>
                                                    <label htmlFor="Warner Bros. Interactive">Warner Bros.
                                                        Interactive</label>
                                                    Games
                                                </li>
                                            </ul>
                                        </div> : ""}
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <div onClick={() => {
                                        setFilterOnRating(!filterOnRating);
                                        setCategoryBox("Rating");
                                    }}
                                         style={{border: "2px blue solid", borderRadius: "10px"}}>
                                        <p>Rating</p>
                                        <img
                                            src={filterOnRating ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALxJREFUSEvtlNENgzAMRI9NyiZlk7IJm9BNugqblJwUS5YbYvsDqRJYigghuedcHAacHMPJ+rge4FEt3aLWZiyi+AqAzwlACBIFiPhT7SAEiQCsuLjDHbgQD6DFKajPgH0X0gNY8RHAt6bP/qcCu5AjQEuc2gLgOs5xIUeAV60YZsdsJTSAYxoyl/e3Ld+eRUuZzKbDAgTC6voR50fvkG1CLUD3zt0A95f0dxa5GWfKNC3WWpC1KA29Aa5lO8NvJxkxC+GFAAAAAElFTkSuQmCC" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALlJREFUSEvtk9ENgzAMRI9N6CYwCpO0m5RNYJOyCe1JjmSBExupkfhIfgDp8p6xkw6VV1eZjyZwO3y7Fu1ScriwcFDATeAeir+26AVgBrAprSXoAQySPVWYGzLhT4GPSnIUEP4WwWRJcgJuXH4b+OQfJIkWaDgzD6vBpWNqST4CISxVnoUz692Do4TfXKu0pQiPCJjREt0FFx4VWJIQ/IpAS/huDvTqkK18OlXujUwBb8hhUC7YBG4LvwncJBla0VEbAAAAAElFTkSuQmCC"}/>
                                    </div>
                                    {filterOnRating ?
                                        <div>
                                            <ul onChange={(event) => filter(event)}>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="Under 1"/>
                                                    <label htmlFor="Under 1">Under 1</label>
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="1-2"/>
                                                    <label htmlFor="1-2">1-2</label>
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="2-3"/>
                                                    <label htmlFor="2-3">2-3</label>
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="4-5"/>
                                                    <label htmlFor="4-5">4-5</label>
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="5"/>
                                                    <label htmlFor="5">5</label>
                                                </li>
                                            </ul>
                                        </div> : ""}
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <div onClick={() => {
                                        setFilterOnPlatform(!filterOnPlatform);
                                        setCategoryBox("Platform");
                                    }}
                                         style={{border: "2px blue solid", borderRadius: "10px"}}>
                                        <p>Platform</p>
                                        <img
                                            src={filterOnPlatform ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALxJREFUSEvtlNENgzAMRI9NyiZlk7IJm9BNugqblJwUS5YbYvsDqRJYigghuedcHAacHMPJ+rge4FEt3aLWZiyi+AqAzwlACBIFiPhT7SAEiQCsuLjDHbgQD6DFKajPgH0X0gNY8RHAt6bP/qcCu5AjQEuc2gLgOs5xIUeAV60YZsdsJTSAYxoyl/e3Ld+eRUuZzKbDAgTC6voR50fvkG1CLUD3zt0A95f0dxa5GWfKNC3WWpC1KA29Aa5lO8NvJxkxC+GFAAAAAElFTkSuQmCC" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALlJREFUSEvtk9ENgzAMRI9N6CYwCpO0m5RNYJOyCe1JjmSBExupkfhIfgDp8p6xkw6VV1eZjyZwO3y7Fu1ScriwcFDATeAeir+26AVgBrAprSXoAQySPVWYGzLhT4GPSnIUEP4WwWRJcgJuXH4b+OQfJIkWaDgzD6vBpWNqST4CISxVnoUz692Do4TfXKu0pQiPCJjREt0FFx4VWJIQ/IpAS/huDvTqkK18OlXujUwBb8hhUC7YBG4LvwncJBla0VEbAAAAAElFTkSuQmCC"}/>
                                    </div>
                                    {filterOnPlatform ?
                                        <div>
                                            <ul onChange={(event) => filter(event)}>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="PS4"/>
                                                    <label htmlFor="PS4">PS4</label>
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="PS5"/>
                                                    <label htmlFor="PS5">PS5</label>
                                                </li>
                                            </ul>
                                        </div> : ""}
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <div onClick={() => {
                                        setFilterOnGenre(!filterOnGenre);
                                        setCategoryBox("Genre");
                                    }}
                                         style={{border: "2px blue solid", borderRadius: "10px"}}>
                                        <p>Genre</p>
                                        <img
                                            src={filterOnGenre ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALxJREFUSEvtlNENgzAMRI9NyiZlk7IJm9BNugqblJwUS5YbYvsDqRJYigghuedcHAacHMPJ+rge4FEt3aLWZiyi+AqAzwlACBIFiPhT7SAEiQCsuLjDHbgQD6DFKajPgH0X0gNY8RHAt6bP/qcCu5AjQEuc2gLgOs5xIUeAV60YZsdsJTSAYxoyl/e3Ld+eRUuZzKbDAgTC6voR50fvkG1CLUD3zt0A95f0dxa5GWfKNC3WWpC1KA29Aa5lO8NvJxkxC+GFAAAAAElFTkSuQmCC" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALlJREFUSEvtk9ENgzAMRI9N6CYwCpO0m5RNYJOyCe1JjmSBExupkfhIfgDp8p6xkw6VV1eZjyZwO3y7Fu1ScriwcFDATeAeir+26AVgBrAprSXoAQySPVWYGzLhT4GPSnIUEP4WwWRJcgJuXH4b+OQfJIkWaDgzD6vBpWNqST4CISxVnoUz692Do4TfXKu0pQiPCJjREt0FFx4VWJIQ/IpAS/huDvTqkK18OlXujUwBb8hhUC7YBG4LvwncJBla0VEbAAAAAElFTkSuQmCC"}/>
                                    </div>
                                    {filterOnGenre ?
                                        <div>
                                            <ul onChange={(event) => filter(event)}>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="Action"/>
                                                    <label htmlFor="Action">Action</label>
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="Sport"/>
                                                    <label htmlFor="Sport">Sport</label>
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="Adventure"/>
                                                    <label htmlFor="Adventure">Adventure</label>
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="Shooter"/>
                                                    <label htmlFor="Shooter">Shooter</label>
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="Adventure"/>
                                                    <label htmlFor="Adventure">Adventure</label>
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="Unique"/>
                                                    <label htmlFor="Unique">Unique</label>
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="Role Playing Games"/>
                                                    <label htmlFor="Role Playing Games">Role Playing Games</label>
                                                </li>
                                                <li key={Math.random() * 100 - 1}>
                                                    <input type="checkbox" name="Fighting"/>
                                                    <label htmlFor="Fighting">Fighting</label>
                                                </li>
                                            </ul>
                                        </div> : ""}
                                </li>
                            </ul>


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