import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function News() {
    const [currentPage, setCurrentPage] = useState("1");
    const [typeOfPage, setTypeOfPage] = useState("ps5");
    const [mainData, setMainData] = useState("");
    const [dataIsReady, setDataIsReady] = useState(false);
    useEffect(() => {
        fetch(process.env.REACT_APP_STATE1 + "/newsAndProducts/listofnewsOrProducts", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({type: typeOfPage, index: currentPage})
        })
            .then(r => r.json())
            .then(resp => {
                setMainData(resp);
                setDataIsReady(true);
            })
            .catch(err => {
                console.log(err)
            })

    }, [currentPage, typeOfPage])
    // const devList = [];
    // mainData.games.forEach((el, i) => {
    //     const step = Object.values(el);
    //     step.forEach(el2 => {
    //         if (!devList.includes(el2.Developer)) devList.push(el2.Developer); // Список всех разработчиков
    //     })
    // })
    return (
        <div className={!dataIsReady ? "loader" : ""}>
            {
                dataIsReady ?
                    <div>
                        <h1>Latest Posts</h1>
                        <div onClick={(event) => {
                            setDataIsReady(false);
                            setTypeOfPage(event.target.innerText.toLowerCase().replace(/\s/gi, "-"));
                        }}>
                            <button>PS5</button>
                            <button>PS-VR2</button>
                            <button>PS4</button>
                            <button>PS-Store</button>
                            <button>PS-Plus</button>
                        </div>
                        <div onClick={(event) => {
                            setDataIsReady(false);
                            setCurrentPage(event.target.innerText);
                        }}>
                            <button>1</button>
                            <button>2</button>
                        </div>
                        <ul>
                            {mainData.map((el, i) => <li key={i * 54}>
                                <Link to={i + 1 + ""} state={{typePage: typeOfPage, curTitle: el.title}}>
                                    <img src={el.img} alt=""/>
                                    <p>{el.title}</p>
                                </Link>
                            </li>)}
                        </ul>
                        {/*<ul>*/}
                        {/*    {devList.map((el, i) => <li key={i * 83}>*/}
                        {/*        {el}*/}
                        {/*    </li>)}*/}
                        {/*</ul>*/}
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

export default News;