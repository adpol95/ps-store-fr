import DataContext from "../../context";
import {useContext, useState} from "react";
import {Link} from "react-router-dom";

function News() {
    const mainData = useContext(DataContext);
    const [currentPage, setCurrentPage] = useState(0);
    const [typeOfPage, setTypeOfPage] = useState("ps5");
    // const devList = [];
    // mainData.games.forEach((el, i) => {
    //     const step = Object.values(el);
    //     step.forEach(el2 => {
    //         if (!devList.includes(el2.Developer)) devList.push(el2.Developer); // Список всех разработчиков
    //     })
    // })
    return (
        <div>
            <h1>Latest Posts</h1>
            <div onClick={(event) => {
                setTypeOfPage(event.target.innerText.toLowerCase().replace(/\s/gi,""))
            }}>
                <button>PS5</button>
                <button>PS VR2</button>
                <button>PS4</button>
                <button>PS Store</button>
                <button>PS Plus</button>
            </div>
            <div onClick={(event) => {
                setCurrentPage(event.target.innerText * 1 - 1)
            }}>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
            </div>
            <ul>
                {mainData.nData[typeOfPage][currentPage].map((el, i) => <li key={i * 54}>
                    <Link to={i + 1 + ""} state={el}>
                        <img src={el.topImg} alt=""/>
                        <p>{el.titleTop}</p>
                        <p>{el.dataTime}</p>
                    </Link>
                </li>)}
            </ul>
            {/*<ul>*/}
            {/*    {devList.map((el, i) => <li key={i * 83}>*/}
            {/*        {el}*/}
            {/*    </li>)}*/}
            {/*</ul>*/}
        </div>
    );
}

export default News;