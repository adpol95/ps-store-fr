import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function Games() {
    const [mainData, setMainData] = useState("");
    const [currentPage, setCurrentPage] = useState("1");
    const [dataIsReady, setDataIsReady] = useState(false);
    const [filterOnPrice, setFilterOnPrice] = useState([false, false]);
    const [filterOnDev  , setFilterOnDev] = useState([false, false]);
    const [filterOnRating, setFilterOnRating] = useState([false, false]);
    const [filterOnPlatform, setFilterOnPlatform] = useState([false, false]);
    const [filterOnGenre, setFilterOnGenre] = useState([false, false]);
    const [categoryBox, setCategoryBox] = useState([]);
    const [currentFilter, setCurrentFilter] = useState([]);
    const [reestr, setReestr] = useState({});
    const [checkBoxName, setCheckBoxName] = useState("default");
    const [checkBoxCounter, setCheckBoxCounter] = useState(-1);
    useEffect(() => {
        if (checkBoxCounter < currentFilter.length) {
            fetch(process.env.REACT_APP_STATE1 + "/newsAndProducts/listofnewsOrProducts", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: currentFilter.length < 1 ? JSON.stringify({type: "games", index: currentPage}) : JSON.stringify({
                    type: "games",
                    filter: {
                        vary: categoryBox[categoryBox.length - 1],
                        value: currentFilter[currentFilter.length - 1]
                    }
                })
            })
                .then(r => r.json())
                .then(resp => {
                    if (categoryBox.length > 1) {
                        setMainData(mainData.filter(el => resp.find(el1 => el1["_id"] === el["_id"])));
                    } else {
                        if (currentFilter.length <= 1) {
                            setMainData(resp)
                            setReestr({...reestr, [checkBoxName]: resp})
                        } else setMainData([...mainData, ...resp])
                    }
                    if (currentFilter.length > 0) {
                        setReestr({...reestr, [checkBoxName]: resp})
                    }
                    setDataIsReady(true);
                    setFilterOnPrice([filterOnPrice[0], false]);
                    setFilterOnDev([filterOnDev[0], false]);
                    setFilterOnRating([filterOnRating[0], false]);
                    setFilterOnPlatform([filterOnPlatform[0], false]);
                    setFilterOnGenre([filterOnGenre[0], false]);
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            setCheckBoxCounter(checkBoxCounter - 1);
            setDataIsReady(true);
        }
    }, [currentPage, currentFilter])
    if (dataIsReady) return (
        <div className="game-list">
            <div className="game-list__top">
                <div>
                    <h3>GAMES</h3>
                </div>
                <div className="game-list__filter">
                    <div className="game-list__filter--shell">
                        <div onClick={() => {
                            setFilterOnPlatform([!filterOnPlatform[0], true]);
                            setCategoryBox([...categoryBox, "Platform"]);
                        }} className="category-btn__active game-list__filter--main-btn">Platform
                        </div>
                        <div className="game-list__filter--window" style={{
                            animation: filterOnPlatform[0] && filterOnPlatform[1] ? "slideRightSide .7s" : !filterOnPlatform[0] && filterOnPlatform[1] ? "slideCenterSide .7s " : "",
                            display: filterOnPlatform[0] ? "flex" : "none",
                        }}>
                            <ul onChange={(event) => {
                                if (event.target.checked) {
                                    setDataIsReady(false);
                                    setCurrentFilter([...currentFilter, event.target.name]);
                                    setCheckBoxName(event.target.name)
                                    setCheckBoxCounter(checkBoxCounter + 1)
                                } else {
                                    setDataIsReady(false);
                                    if (currentFilter.length > 0) {
                                        delete reestr[event.target.name];
                                        let arr = [];
                                        if (currentFilter.length >= 2) arr = [...reestr[currentFilter[currentFilter.length - 2]]]
                                        else arr = [...reestr.default]
                                        setMainData(arr)
                                        setCurrentFilter(currentFilter.filter(el => el !== event.target.name));
                                    }

                                }
                            }}>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="PS4"
                                           defaultChecked={currentFilter.some(el => el === "PS4") ? true : undefined}/>
                                    <label htmlFor="PS4">PS4</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="PS5"
                                           defaultChecked={currentFilter.some(el => el === "PS5") ? true : undefined}/>
                                    <label htmlFor="PS5">PS5</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="game-list__filter--shell">
                        <div onClick={() => {
                            setFilterOnGenre([!filterOnGenre[0], true]);
                            setCategoryBox([...categoryBox, "Genre"]);
                        }} className="category-btn__active game-list__filter--main-btn">Genre
                        </div>
                        <div className="game-list__filter--window" style={{
                            animation: filterOnGenre[0] && filterOnGenre[1] ? "slideRightSide .7s" : !filterOnGenre[0] && filterOnGenre[1] ? "slideCenterSide .7s " : "",
                            display: filterOnGenre[0] ? "flex" : "none",
                        }}>
                            <ul onChange={(event) => {
                                if (event.target.checked) {
                                    setDataIsReady(false);
                                    setCurrentFilter([...currentFilter, event.target.name]);
                                    setCheckBoxName(event.target.name)
                                    setCheckBoxCounter(checkBoxCounter + 1)
                                } else {
                                    setDataIsReady(false);
                                    if (currentFilter.length > 0) {
                                        delete reestr[event.target.name];
                                        let arr = [];
                                        if (currentFilter.length >= 2) arr = [...reestr[currentFilter[currentFilter.length - 2]]]
                                        else arr = [...reestr.default]
                                        setMainData(arr)
                                        setCurrentFilter(currentFilter.filter(el => el !== event.target.name));
                                    }
                                }
                            }}>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="Action"
                                           defaultChecked={currentFilter.some(el => el === "Action") ? true : undefined}/>
                                    <label htmlFor="Action">Action</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="Sport"
                                           defaultChecked={currentFilter.some(el => el === "Sport") ? true : undefined}/>
                                    <label htmlFor="Sport">Sport</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="Adventure"
                                           defaultChecked={currentFilter.some(el => el === "Adventure") ? true : undefined}/>
                                    <label htmlFor="Adventure">Adventure</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="Shooter"
                                           defaultChecked={currentFilter.some(el => el === "Shooter") ? true : undefined}/>
                                    <label htmlFor="Shooter">Shooter</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="Unique"
                                           defaultChecked={currentFilter.some(el => el === "Unique") ? true : undefined}/>
                                    <label htmlFor="Unique">Unique</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="Role Playing Games"
                                           defaultChecked={currentFilter.some(el => el === "Role Playing Games") ? true : undefined}/>
                                    <label htmlFor="Role Playing Games">Role Playing Games</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="Fighting"
                                           defaultChecked={currentFilter.some(el => el === "Fighting") ? true : undefined}/>
                                    <label htmlFor="Fighting">Fighting</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="game-list__filter--shell">
                        <div onClick={() => {
                            setFilterOnDev([!filterOnDev[0], true]);
                            setCategoryBox([...categoryBox, "Developer"]);
                        }} className="category-btn__active game-list__filter--main-btn">Developer
                        </div>
                        <div className="game-list__filter--window" style={{
                            animation: filterOnDev[0] && filterOnDev[1] ? "slideRightSide .7s" : !filterOnDev[0] && filterOnDev[1] ? "slideCenterSide .7s " : "",
                            display: filterOnDev[0] ? "flex" : "none",
                        }}>
                            <ul onChange={(event) => {
                                if (event.target.checked) {
                                    setDataIsReady(false);
                                    setCurrentFilter([...currentFilter, event.target.name]);
                                    setCheckBoxName(event.target.name)
                                    setCheckBoxCounter(checkBoxCounter + 1)
                                } else {
                                    setDataIsReady(false);
                                    if (currentFilter.length > 0) {
                                        delete reestr[event.target.name];
                                        let arr = [];
                                        if (currentFilter.length >= 2) arr = [...reestr[currentFilter[currentFilter.length - 2]]]
                                        else arr = [...reestr.default]
                                        setMainData(arr)
                                        setCurrentFilter(currentFilter.filter(el => el !== event.target.name));
                                    }
                                }
                            }}>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="Sony Interactive Entertainment"
                                           defaultChecked={currentFilter.some(el => el === "Sony Interactive Entertainment") ? true : undefined}/>
                                    <label htmlFor="Sony Interactive Entertainment">Sony Interactive
                                        Entertainment</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="Epic Games"
                                           defaultChecked={currentFilter.some(el => el === "Epic Games") ? true : undefined}/>
                                    <label htmlFor="Epic Games">Epic Games</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="2K"
                                           defaultChecked={currentFilter.some(el => el === "2K") ? true : undefined}/>
                                    <label htmlFor="2K">2K</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="Activision"
                                           defaultChecked={currentFilter.some(el => el === "Activision") ? true : undefined}/>
                                    <label htmlFor="Activision">Activision</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="Electronic Arts Inc"
                                           defaultChecked={currentFilter.some(el => el === "Electronic Arts Inc") ? true : undefined}/>
                                    <label htmlFor="Electronic Arts Inc">Electronic Arts Inc</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="Ubisoft Entertainment"
                                           defaultChecked={currentFilter.some(el => el === "Ubisoft Entertainment") ? true : undefined}/>
                                    <label htmlFor="Ubisoft Entertainment">Ubisoft Entertainment</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="Rockstar Games"
                                           defaultChecked={currentFilter.some(el => el === "Rockstar Games") ? true : undefined}/>
                                    <label htmlFor="Rockstar Games">Rockstar Games</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="Blizzard Entertainment, Inc."
                                           defaultChecked={currentFilter.some(el => el === "Blizzard Entertainment, Inc.") ? true : undefined}/>
                                    <label htmlFor="Blizzard Entertainment, Inc.">Blizzard
                                        Entertainment, Inc.</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="Warner Bros. Interactive"
                                           defaultChecked={currentFilter.some(el => el === "Warner Bros. Interactive") ? true : undefined}/>
                                    <label htmlFor="Warner Bros. Interactive">Warner Bros.
                                        Interactive</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="game-list__filter--shell">
                        <div onClick={() => {
                            setFilterOnPrice([!filterOnPrice[0], true]);
                            setCategoryBox([...categoryBox, "Price"]);
                        }} className="category-btn__active game-list__filter--main-btn">Price
                        </div>
                        <div className="game-list__filter--window" style={{
                            animation: filterOnPrice[0] && filterOnPrice[1] ? "slideRightSide .7s" : !filterOnPrice[0] && filterOnPrice[1] ? "slideCenterSide .7s " : "",
                            display: filterOnPrice[0] ? "flex" : "none"
                        }}>
                            <ul onChange={(event) => {
                                if (event.target.checked) {
                                    setDataIsReady(false);
                                    setCurrentFilter([...currentFilter, event.target.name]);
                                    setCheckBoxName(event.target.name)
                                    setCheckBoxCounter(checkBoxCounter + 1)
                                } else {
                                    setDataIsReady(false);
                                    if (currentFilter.length > 0) {
                                        delete reestr[event.target.name];
                                        let arr = [];
                                        if (currentFilter.length >= 2) arr = [...reestr[currentFilter[currentFilter.length - 2]]]
                                        else arr = [...reestr.default]
                                        setMainData(arr)
                                        setCurrentFilter(currentFilter.filter(el => el !== event.target.name));
                                    }
                                }
                            }}>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="Free"
                                           defaultChecked={currentFilter.some(el => el === "Free") ? true : undefined}/>
                                    <label htmlFor="Free">Free</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="2"
                                           defaultChecked={currentFilter.some(el => el === "2") ? true : undefined}/>
                                    <label htmlFor="2">Under 1.99</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="2-5"
                                           defaultChecked={currentFilter.some(el => el === "2-5") ? true : undefined}/>
                                    <label htmlFor="2-5">2.00-5.00</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="5-10"
                                           defaultChecked={currentFilter.some(el => el === "5-10") ? true : undefined}/>
                                    <label htmlFor="5-10">5.00-10.00</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="10-50"
                                           defaultChecked={currentFilter.some(el => el === "10-50") ? true : undefined}/>
                                    <label htmlFor="10-50">10.00-50.00</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="50-100"
                                           defaultChecked={currentFilter.some(el => el === "50-100") ? true : undefined}/>
                                    <label htmlFor="50-100">50.00-100.00</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="game-list__filter--shell">
                        <div onClick={() => {
                            setFilterOnRating([!filterOnRating[0], true]);
                            setCategoryBox([...categoryBox, "Rating"]);
                        }} className="category-btn__active game-list__filter--main-btn">Rating
                        </div>
                        <div className="game-list__filter--window" style={{
                            animation: filterOnRating[0] && filterOnRating[1] ? "slideRightSide .7s" : !filterOnRating[0] && filterOnRating[1] ? "slideCenterSide .7s " : "",
                            display: filterOnRating[0] ? "flex" : "none",
                        }}>
                            <ul onChange={(event) => {
                                if (event.target.checked) {
                                    setDataIsReady(false);
                                    setCurrentFilter([...currentFilter, event.target.name]);
                                    setCheckBoxName(event.target.name)
                                    setCheckBoxCounter(checkBoxCounter + 1)
                                } else {
                                    setDataIsReady(false);
                                    if (currentFilter.length > 0) {
                                        delete reestr[event.target.name];
                                        let arr = [];
                                        if (currentFilter.length >= 2) arr = [...reestr[currentFilter[currentFilter.length - 2]]]
                                        else arr = [...reestr.default]
                                        setMainData(arr)
                                        setCurrentFilter(currentFilter.filter(el => el !== event.target.name));
                                    }
                                }
                            }}>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="1"
                                           defaultChecked={currentFilter.some(el => el === "1") ? true : undefined}/>
                                    <label htmlFor="Under 1">Under 1</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="1-2"
                                           defaultChecked={currentFilter.some(el => el === "1-2") ? true : undefined}/>
                                    <label htmlFor="1-2">1-2</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="2-3"
                                           defaultChecked={currentFilter.some(el => el === "2-3") ? true : undefined}/>
                                    <label htmlFor="2-3">2-3</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="4-5"
                                           defaultChecked={currentFilter.some(el => el === "4-5") ? true : undefined}/>
                                    <label htmlFor="4-5">4-5</label>
                                </li>
                                <li key={Math.random() * 100 - 1}>
                                    <input type="checkbox" name="5"
                                           defaultChecked={currentFilter.some(el => el === "5") ? true : undefined}/>
                                    <label htmlFor="5">5</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="game-list__middle">
                {mainData.map((el, i) => {
                    const readyTitle = el.title.includes('&#x27;') ? el.title.replace(/&#x27;/g, `'`) : el.title;
                    return <Link to={el["_id"]} state={{curTitle: readyTitle}} className="game-pack">
                        <div className="game-pack__top">
                            <img src={el.img} alt=""  style={{objectFit: "cover", objectPosition: "0 25%"}}/>
                            <div className="game-pack__price">
                                {el.Price}
                            </div>
                        </div>
                        <div className="game-pack__down">
                            <div className="game-pack__down--left">
                                <h4 className="game-pack__down--genre">
                                    {el.Genre}
                                </h4>
                                <h4 className="game-pack__down--title">
                                    {readyTitle}
                                </h4>
                            </div>
                            <div className="game-pack__down--right">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                     viewBox="0 0 24 24"
                                     fill="#F9F7F0">
                                    <path
                                        d="M5 22h14a2 2 0 0 0 2-2V9a1 1 0 0 0-1-1h-3v-.777c0-2.609-1.903-4.945-4.5-5.198A5.005 5.005 0 0 0 7 7v1H4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2zm12-12v2h-2v-2h2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-2 3h2v2H7v-2z"></path>
                                </svg>
                            </div>
                        </div>
                    </Link>
                })}
            </div>
            <div onClick={(event) => {
                setDataIsReady(false);
                setCurrentPage(event.target.innerText === ">" && currentPage < 2 ? +currentPage + 1 + "" : event.target.innerText === "<" && currentPage > 1 ? +currentPage - 1 + "" : typeof (+event.target.innerText) === "number" ? event.target.innerText : "1");
            }} className="game-list__pages">
                <button>{"<"}</button>
                <button style={currentPage === "1" ? {background: "#18B7BEFF", color: "#E2E9ECFF"} : {}}>1</button>
                <button style={currentPage === "2" ? {background: "#18B7BEFF", color: "#E2E9ECFF"} : {}}>2</button>
                <button style={currentPage === "3" ? {background: "#18B7BEFF", color: "#E2E9ECFF"} : {}}>3</button>
                <button style={currentPage === "4" ? {background: "#18B7BEFF", color: "#E2E9ECFF"} : {}}>4</button>
                <button>{">"}</button>
            </div>
        </div>)
    else return (
        <div className="loader">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Games;

//                         <div style={{position: "relative"}}>
//                             <img
//                                 src="https://preview.redd.it/tb0anht7pw6a1.png?width=640&crop=smart&auto=webp&s=81e586eee29442018675844ebb6d2216ac78df55"
//                                 alt="" style={{width: "100px"}}/>
//                             <img src={el.img} alt="" style={{
//                                 width: "98px",
//                                 height: "81.5%",
//                                 position: "absolute",
//                                 left: "0",
//                                 top: "13.3%",
//                                 objectFit: "cover"
//                             }}/>
//                         </div>
// ИГРА PS5 В ОБЛОЖКЕ