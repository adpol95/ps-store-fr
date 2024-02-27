import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

function AccessoriesPage() {
    const {state} = useLocation();
    const title = state.curTitle;
    const [datas, setDatas] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [currentColor, setCurrentColor] = useState(title.includes("NVMe") ?
        "1TB" : title.includes("DUALSHOCK") ? "Jet Black" : title.includes("Covers") ?
            "Midnight Black" : title.includes("Wireless")
                ? "White" : false);
    const [currentImgs, setCurrentImgs] = useState("");
    const [stateColors, setStateColors] = useState("");
    const [inBox, setInBox] = useState("");
    const [dataIsReady, setDataIsReady] = useState(false);
    useEffect(() => {
        fetch(process.env.REACT_APP_STATE1 + "/newsAndProducts/page", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({type: "accessories", name: state.curTitle})
        })
            .then(r => r.json())
            .then(resp => {
                setDatas(resp[0].value);
                if (currentColor) {
                    setStateColors(<ul
                        style={{display: "grid", gridTemplateColumns: "85px 85px 85px", columnGap: "5px"}}>
                        {Object.keys(resp[0].value.allImgsAndTitles).map((el, i) => <li key={i * 23}
                                                                                        style={{listStyleType: "none"}}>
                            <img src={resp[0].value.allImgsAndTitles[el][title.includes("SSD") ? 3 : 0]} alt={el}
                                 style={{
                                     objectFit: "none",
                                     width: "100%",
                                     objectPosition: title.includes("Covers") ? "63% 10%" : title.includes("DUALSHOCK") ? "12% 65%" : title.includes("SSD") ? "27% 44%" : "50% 27%"
                                 }}
                            />
                        </li>)}
                    </ul>)
                    setCurrentImgs(resp[0].value.allImgsAndTitles[currentColor])
                } else {
                    setCurrentImgs(resp[0].value.descriptionImgs)
                    setInBox(<div>
                        <h3>What in the box</h3>
                        <ul>
                            {resp[0].value.whatInTheBox.map((el, i) => <li key={i * 12}>
                                {el}
                            </li>)}
                        </ul>
                    </div>)
                }
                setDataIsReady(true);
            })
            .catch(err => {
                console.log(err)
            })

    }, [])
    useEffect(() => {
        if (datas && currentColor) setCurrentImgs(datas.allImgsAndTitles[currentColor])
    }, [currentColor]);
    return (
        <div onClick={(event) => {
            if (event.target.innerText === '<' && currentPage > 0) {
                setCurrentPage(currentPage - 1)
            } else if (event.target.innerText === '>' && currentPage !== currentImgs.length - 1) {
                setCurrentPage(currentPage + 1)
            }
        }} className={!dataIsReady ? "loader" : ""}>
            {dataIsReady ?
                <div>
                    <h1>
                        {`${title}  ${currentColor ? " " + "-" + " " + currentColor: ""}`}
                    </h1>
                    <button>
                        &lt;
                    </button>
                    <img src={currentImgs[currentPage]} alt="" style={{width: "300px"}}/>
                    <button>
                        &gt;
                    </button>
                    <div onClick={(event) => {
                        if (event.target.localName === "img") {
                            setCurrentColor(event.target.alt);
                        }
                    }}>
                        {currentColor ? <div> Color: {currentColor}
                        </div> : ""}
                        {stateColors}
                    </div>
                    <div>Realise date: {datas.realiseDate}</div>
                    <div>Price: {datas.price}</div>
                    <div>{datas.previewText}</div>
                    <hr/>
                    <div>
                        <h3>Tearms</h3>
                        <ul>
                            {datas.terms.map((el, i) => <li key={i * 14}>
                                {el}
                            </li>)}
                        </ul>
                    </div>
                    <hr/>
                    <div>
                        <ul>
                            {datas.mainText.map((el, i) => <li key={i * 114}>
                                    <img src={currentImgs[i + 1]} alt="accessories img error"/>
                                    <h3>
                                        {el.title}
                                    </h3>
                                    <ul>
                                        {el.descript.map((el, il) => <li key={il * 221}>{el}</li>)}
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>
                    <hr/>
                    {inBox}
                </div> :
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
        </div>
    )

}

export default AccessoriesPage;