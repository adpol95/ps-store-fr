import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function Games() {

    const [mainData, setMainData] = useState("");
    const [currentPage, setCurrentPage] = useState("1");
    const [dataIsReady, setDataIsReady] = useState(false);
    const [filterOnPrice, setFilterOnPrice] = useState(false);
    const [filterOnDev, setFilterOnDev] = useState(false);
    const [filterOnRating, setFilterOnRating] = useState(false);
    const [filterOnPlatform, setFilterOnPlatform] = useState(false);
    const [filterOnGenre, setFilterOnGenre] = useState(false);
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
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            setCheckBoxCounter(checkBoxCounter - 1);
            setDataIsReady(true);
        }
    }, [currentPage, currentFilter])
    return (
        <div className={!dataIsReady ? "loader" : ""}>
            <div style={{position: "absolute", width: "300px", left: "70%"}}>
                <h3>
                    Filter
                </h3>
                <ul>
                    <li key={Math.random() * 100 - 1}>
                        <div onClick={() => {
                            setFilterOnPrice(!filterOnPrice)
                            setCategoryBox([...categoryBox, "Price"]);
                        }} style={{border: "2px blue solid", borderRadius: "10px"}}>
                            <p>Price</p>
                            <img
                                src={filterOnPrice ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALxJREFUSEvtlNENgzAMRI9NyiZlk7IJm9BNugqblJwUS5YbYvsDqRJYigghuedcHAacHMPJ+rge4FEt3aLWZiyi+AqAzwlACBIFiPhT7SAEiQCsuLjDHbgQD6DFKajPgH0X0gNY8RHAt6bP/qcCu5AjQEuc2gLgOs5xIUeAV60YZsdsJTSAYxoyl/e3Ld+eRUuZzKbDAgTC6voR50fvkG1CLUD3zt0A95f0dxa5GWfKNC3WWpC1KA29Aa5lO8NvJxkxC+GFAAAAAElFTkSuQmCC" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALlJREFUSEvtk9ENgzAMRI9N6CYwCpO0m5RNYJOyCe1JjmSBExupkfhIfgDp8p6xkw6VV1eZjyZwO3y7Fu1ScriwcFDATeAeir+26AVgBrAprSXoAQySPVWYGzLhT4GPSnIUEP4WwWRJcgJuXH4b+OQfJIkWaDgzD6vBpWNqST4CISxVnoUz692Do4TfXKu0pQiPCJjREt0FFx4VWJIQ/IpAS/huDvTqkK18OlXujUwBb8hhUC7YBG4LvwncJBla0VEbAAAAAElFTkSuQmCC"}/>
                        </div>
                        {filterOnPrice ?
                            <div>
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
                            </div> : ""}
                    </li>
                    <li key={Math.random() * 100 - 1}>
                        <div onClick={() => {
                            setFilterOnDev(!filterOnDev)
                            setCategoryBox([...categoryBox, "Developer"]);
                        }}
                             style={{border: "2px blue solid", borderRadius: "10px"}}>
                            <p>Developer</p>
                            <img
                                src={filterOnDev ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALxJREFUSEvtlNENgzAMRI9NyiZlk7IJm9BNugqblJwUS5YbYvsDqRJYigghuedcHAacHMPJ+rge4FEt3aLWZiyi+AqAzwlACBIFiPhT7SAEiQCsuLjDHbgQD6DFKajPgH0X0gNY8RHAt6bP/qcCu5AjQEuc2gLgOs5xIUeAV60YZsdsJTSAYxoyl/e3Ld+eRUuZzKbDAgTC6voR50fvkG1CLUD3zt0A95f0dxa5GWfKNC3WWpC1KA29Aa5lO8NvJxkxC+GFAAAAAElFTkSuQmCC" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALlJREFUSEvtk9ENgzAMRI9N6CYwCpO0m5RNYJOyCe1JjmSBExupkfhIfgDp8p6xkw6VV1eZjyZwO3y7Fu1ScriwcFDATeAeir+26AVgBrAprSXoAQySPVWYGzLhT4GPSnIUEP4WwWRJcgJuXH4b+OQfJIkWaDgzD6vBpWNqST4CISxVnoUz692Do4TfXKu0pQiPCJjREt0FFx4VWJIQ/IpAS/huDvTqkK18OlXujUwBb8hhUC7YBG4LvwncJBla0VEbAAAAAElFTkSuQmCC"}/>
                        </div>
                        {filterOnDev ?
                            <div>
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
                            </div> : ""}
                    </li>
                    <li key={Math.random() * 100 - 1}>
                        <div onClick={() => {
                            setFilterOnRating(!filterOnRating);
                            setCategoryBox([...categoryBox, "Rating"]);
                        }}
                             style={{border: "2px blue solid", borderRadius: "10px"}}>
                            <p>Rating</p>
                            <img
                                src={filterOnRating ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALxJREFUSEvtlNENgzAMRI9NyiZlk7IJm9BNugqblJwUS5YbYvsDqRJYigghuedcHAacHMPJ+rge4FEt3aLWZiyi+AqAzwlACBIFiPhT7SAEiQCsuLjDHbgQD6DFKajPgH0X0gNY8RHAt6bP/qcCu5AjQEuc2gLgOs5xIUeAV60YZsdsJTSAYxoyl/e3Ld+eRUuZzKbDAgTC6voR50fvkG1CLUD3zt0A95f0dxa5GWfKNC3WWpC1KA29Aa5lO8NvJxkxC+GFAAAAAElFTkSuQmCC" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALlJREFUSEvtk9ENgzAMRI9N6CYwCpO0m5RNYJOyCe1JjmSBExupkfhIfgDp8p6xkw6VV1eZjyZwO3y7Fu1ScriwcFDATeAeir+26AVgBrAprSXoAQySPVWYGzLhT4GPSnIUEP4WwWRJcgJuXH4b+OQfJIkWaDgzD6vBpWNqST4CISxVnoUz692Do4TfXKu0pQiPCJjREt0FFx4VWJIQ/IpAS/huDvTqkK18OlXujUwBb8hhUC7YBG4LvwncJBla0VEbAAAAAElFTkSuQmCC"}/>
                        </div>
                        {filterOnRating ?
                            <div>
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
                            </div> : ""}
                    </li>
                    <li key={Math.random() * 100 - 1}>
                        <div onClick={() => {
                            setFilterOnPlatform(!filterOnPlatform);
                            setCategoryBox([...categoryBox, "Platform"]);
                        }}
                             style={{border: "2px blue solid", borderRadius: "10px"}}>
                            <p>Platform</p>
                            <img
                                src={filterOnPlatform ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALxJREFUSEvtlNENgzAMRI9NyiZlk7IJm9BNugqblJwUS5YbYvsDqRJYigghuedcHAacHMPJ+rge4FEt3aLWZiyi+AqAzwlACBIFiPhT7SAEiQCsuLjDHbgQD6DFKajPgH0X0gNY8RHAt6bP/qcCu5AjQEuc2gLgOs5xIUeAV60YZsdsJTSAYxoyl/e3Ld+eRUuZzKbDAgTC6voR50fvkG1CLUD3zt0A95f0dxa5GWfKNC3WWpC1KA29Aa5lO8NvJxkxC+GFAAAAAElFTkSuQmCC" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALlJREFUSEvtk9ENgzAMRI9N6CYwCpO0m5RNYJOyCe1JjmSBExupkfhIfgDp8p6xkw6VV1eZjyZwO3y7Fu1ScriwcFDATeAeir+26AVgBrAprSXoAQySPVWYGzLhT4GPSnIUEP4WwWRJcgJuXH4b+OQfJIkWaDgzD6vBpWNqST4CISxVnoUz692Do4TfXKu0pQiPCJjREt0FFx4VWJIQ/IpAS/huDvTqkK18OlXujUwBb8hhUC7YBG4LvwncJBla0VEbAAAAAElFTkSuQmCC"}/>
                        </div>
                        {filterOnPlatform ?
                            <div>
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
                            </div> : ""}
                    </li>
                    <li key={Math.random() * 100 - 1}>
                        <div onClick={() => {
                            setFilterOnGenre(!filterOnGenre);
                            setCategoryBox([...categoryBox, "Genre"]);
                        }}
                             style={{border: "2px blue solid", borderRadius: "10px"}}>
                            <p>Genre</p>
                            <img
                                src={filterOnGenre ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALxJREFUSEvtlNENgzAMRI9NyiZlk7IJm9BNugqblJwUS5YbYvsDqRJYigghuedcHAacHMPJ+rge4FEt3aLWZiyi+AqAzwlACBIFiPhT7SAEiQCsuLjDHbgQD6DFKajPgH0X0gNY8RHAt6bP/qcCu5AjQEuc2gLgOs5xIUeAV60YZsdsJTSAYxoyl/e3Ld+eRUuZzKbDAgTC6voR50fvkG1CLUD3zt0A95f0dxa5GWfKNC3WWpC1KA29Aa5lO8NvJxkxC+GFAAAAAElFTkSuQmCC" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALlJREFUSEvtk9ENgzAMRI9N6CYwCpO0m5RNYJOyCe1JjmSBExupkfhIfgDp8p6xkw6VV1eZjyZwO3y7Fu1ScriwcFDATeAeir+26AVgBrAprSXoAQySPVWYGzLhT4GPSnIUEP4WwWRJcgJuXH4b+OQfJIkWaDgzD6vBpWNqST4CISxVnoUz692Do4TfXKu0pQiPCJjREt0FFx4VWJIQ/IpAS/huDvTqkK18OlXujUwBb8hhUC7YBG4LvwncJBla0VEbAAAAAElFTkSuQmCC"}/>
                        </div>
                        {filterOnGenre ?
                            <div>
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
                            </div> : ""}
                    </li>
                </ul>
            </div>
            {dataIsReady ?
                <div>
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
                                <Link to={el["_id"]} state={{curTitle: readyTitle}}>
                                    {readyTitle}
                                    <div style={{position: "relative"}}>
                                        <img
                                            src="https://preview.redd.it/tb0anht7pw6a1.png?width=640&crop=smart&auto=webp&s=81e586eee29442018675844ebb6d2216ac78df55"
                                            alt="" style={{width: "100px"}}/>
                                        <img src={el.img} alt="" style={{width: "98px", height: "81.5%", position: "absolute", left: "0", top: "13.3%", objectFit: "cover"}}/>
                                    </div>
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
                </div>}
        </div>
    );
}

export default Games;