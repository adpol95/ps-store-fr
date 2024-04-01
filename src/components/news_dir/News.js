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
                    <div className="products-list news-list" >
                        <div className="products-list__top">
                            <div>
                                <h3>NEWS</h3>
                            </div>
                            <div className="products-list__filter" onClick={(event) => {
                                setDataIsReady(false);
                                setTypeOfPage(event.target.innerText.toLowerCase().replace(/\s/gi, "-"));
                            }}>
                                <div className="category-btn__active products-list__filter--main-btn">PS5</div>
                                <div className="category-btn__active products-list__filter--main-btn">PS-VR2</div>
                                <div className="category-btn__active products-list__filter--main-btn">PS4</div>
                                <div className="category-btn__active products-list__filter--main-btn">PS-Store</div>
                                <div className="category-btn__active products-list__filter--main-btn">PS-Plus</div>
                            </div>
                        </div>
                        <h1 style={{color: "black"}}>Latest Posts</h1>
                        <ul style={{display: "flex", flexDirection: "column", rowGap: "2em", width: "100%"}}>
                            {mainData.map((el, i) => <li key={i * 54} className="products-list__filter--window">
                                <Link to={i + 1 + ""} state={{image: el.img, typePage: typeOfPage, curTitle: el.title}} style={{color: "black"}}>
                                    <h3>{el.title}</h3>
                                    <img src={el.img} alt="" style={{borderRadius: "2em", width: "100%"}}/>
                                </Link>
                            </li>)}
                        </ul>
                        {/*<ul>*/}
                        {/*    {devList.map((el, i) => <li key={i * 83}>*/}
                        {/*        {el}*/}
                        {/*    </li>)}*/}
                        {/*</ul>*/}
                        <div onClick={(event) => {
                            setDataIsReady(false);
                            setCurrentPage(event.target.innerText);
                        }} className="products-list__pages">
                            <button>{"<"}</button>
                            <button style={currentPage === "1" ? {background: "#18B7BEFF", color: "#E2E9ECFF"} : {}}>1
                            </button>
                            <button style={currentPage === "2" ? {background: "#18B7BEFF", color: "#E2E9ECFF"} : {}}>2
                            </button>
                            <button style={currentPage === "3" ? {background: "#18B7BEFF", color: "#E2E9ECFF"} : {}}>3
                            </button>
                            <button style={currentPage === "4" ? {background: "#18B7BEFF", color: "#E2E9ECFF"} : {}}>4
                            </button>
                            <button>{">"}</button>
                        </div>
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