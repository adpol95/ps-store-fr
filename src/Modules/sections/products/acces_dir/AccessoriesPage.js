import {useLocation} from "react-router-dom";
import {useState} from "react";

function AccessoriesPage() {
    const {state} = useLocation();
    const title = state.dataAboutGame[0];
    const datas = state.dataAboutGame[1];
    const [currentPage, setCurrentPage] = useState(0);
    const [currentColor, setCurrentColor] = useState(title.includes("NVMe") ? "1TB" : title.includes("DUALSHOCK") ? "Jet Black" : title.includes("Covers") ? "Midnight Black" : title.includes("Wireless") ? "" : false);
    const currentImgs = typeof currentColor !== "boolean" ? datas.allImgsAndTitles[currentColor] : datas.descriptionImgs;
    const stateColors = currentColor === false ? "" :
        <ul style={{display: "grid", gridTemplateColumns: "85px 85px 85px", columnGap: "5px"}}>
            {Object.keys(datas.allImgsAndTitles).map((el, i) => <li key={i * 23}
                                                                    style={{listStyleType: "none"}}>
                <img src={datas.allImgsAndTitles[el][title.includes("SSD") ? 3 : 0]} alt={el} style={{
                    objectFit: "none",
                    width: "100%",
                    objectPosition: title.includes("Covers") ? "63% 10%" : title.includes("DUALSHOCK") ? "12% 65%" : title.includes("SSD") ? "27% 44%" : "50% 27%"
                }}
                />
            </li>)}
        </ul>
    const inBox = currentColor === false ? <div>
        <h3>What in the box</h3>
        <ul>
            {datas.whatInTheBox.map((el, i) => <li key={i * 12}>
                {el}
            </li>)}
        </ul>
    </div> : "";

    return (
        <div onClick={(event) => {
            if (event.target.innerText === '<' && currentPage > 0) {
                setCurrentPage(currentPage - 1)
            } else if (event.target.innerText === '>' && currentPage !== currentImgs.length - 1) {
                setCurrentPage(currentPage + 1)
            }
        }}>
            <h1>
                {`${title}  ${currentColor ? " " + "-" + " " : ""} ${currentColor}`}
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
                {currentColor !== false ? <div> Color: {currentColor ? currentColor : "White"}
                </div> : ""}
                {stateColors}
            </div>
            <div>Realise date: {datas.realiseDate}</div>
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
        </div>
    )

}

export default AccessoriesPage;