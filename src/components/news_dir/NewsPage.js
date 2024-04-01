import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

function NewsPage() {
    const {state} = useLocation();
    let imgCounter = 0;
    const [mainData, setMainData] = useState("");
    const [dataIsReady, setDataIsReady] = useState(false);
    useEffect(() => {
        fetch(process.env.REACT_APP_STATE1 + "/newsAndProducts/page", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({type: state.typePage, name: state.curTitle})
        })
            .then(r => r.json())
            .then(resp => {
                setMainData(resp);
                setDataIsReady(true);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);
    return (
        dataIsReady ?
            <div className="products-list news-page">
                <div className="products-list__top" style={{backgroundImage: `url(${state.image})`}}>
                    <div>
                        <h3>{mainData.headerTitle}</h3>
                    </div>
                </div>
                <div className="news-page__middle-sec">
                    <div className="news-page__middle-sec--header">
                        <div>
                            {mainData.dataTime}
                        </div>
                        <h1>{mainData.titleTop}</h1>
                        <div className="news-page__header--author-section">
                            <img src={mainData.topImg} alt="" className="news-page__header--avatar"/>
                            <div className="news-page__header--author--right">
                                <div> <span>{mainData.authorName}</span></div>
                                <div>{mainData.authorDescription}</div>
                            </div>
                        </div>
                    </div>
                    <div className="news-page__middle-sec--main">
                        <h3>
                            {mainData.headerTitle}
                        </h3>
                        <div>
                            {mainData.mainText.map((el) => {
                                if (el[0] === "P") {
                                    if (!el[1]) {
                                        imgCounter++
                                        return (
                                            <img src={mainData.mainImgs[imgCounter]} alt=""/>
                                        )
                                    } else return el[1]
                                } else if (el[0] === "H2") return (
                                    <h2>
                                        {el[1]}
                                    </h2>
                                )
                                else if (el[0] === "A") {
                                    imgCounter++;
                                    return (
                                        <img src={mainData.mainImgs[imgCounter]} alt=""/>
                                    )
                                } else return (
                                    <h2>
                                        Video here
                                    </h2>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div> :
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
    )
}

// Работаю над исправлением отображения изображений
export default NewsPage;
