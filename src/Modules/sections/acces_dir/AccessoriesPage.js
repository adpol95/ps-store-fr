import {useLocation} from "react-router-dom";
import {useState} from "react";

function AccessoriesPage() {
    const {state} = useLocation();
    const title = state.dataAboutGame[0];
    const datas = state.dataAboutGame[1];
    const typeOfAccess = datas.allImgsAndTitles ? "allImgsAndTitles" : "descriptionImgs";
    const [currentPage, setCurrentPage] = useState(0);
    const [currentColor, setCurrentColor] = useState(title.includes("NVMe") ? "1TB" : title.includes("DUALSHOCK") ? "Jet Black" : title.includes("Covers") ? "Midnight Black" : "");
    console.log(datas[typeOfAccess][currentColor].length, currentPage)
    return (
        <div onClick={(event) => {
            if (event.target.innerText === '<' && currentPage > 0) {
                setCurrentPage(currentPage - 1)
            } else if (event.target.innerText === '>' && currentPage !== datas[typeOfAccess][currentColor].length - 1) {
                setCurrentPage(currentPage + 1)
            }
        }}>
            <h1>
                {`${title}  ${currentColor ? " " + "-" + " " : ""} ${currentColor}`}
            </h1>
            <button>
                &lt;
            </button>
            <img src={datas[typeOfAccess][currentColor][currentPage]} alt="" style={{width: "300px"}}/>
            <button>
                &gt;
            </button>
            {/*<div onClick={(event) => {*/}
            {/*    if (event.target.localName === "img") {*/}
            {/*        setCurrentColor(event.target.alt);*/}
            {/*    }*/}
            {/*}}>*/}
            {/*    Color: {currentColor ? currentColor : "White"}*/}
            {/*    <ul style={{display: "grid", gridTemplateColumns: "85px 85px 85px", columnGap: "5px"}}>*/}
            {/*        {Object.keys(datas.allImgsAndTitles).map((el, i) => <li key={i * 23} style={{listStyleType: "none"}}>*/}
            {/*            <img src={datas.allImgsAndTitles[el][title.includes("SSD") ? 3 : 0]}  alt={el}  style={{*/}
            {/*                objectFit: "none",*/}
            {/*                width: "100%",*/}
            {/*                objectPosition: title.includes("Covers") ? "63% 10%" : title.includes("DUALSHOCK") ?  "12% 65%" : title.includes("SSD") ? "27% 44%" : "50% 27%"*/}
            {/*            }}*/}
            {/*            />*/}
            {/*        </li>)}*/}
            {/*    </ul>*/}
            {/*</div>*/}
            {/*<div>Realise date: {datas.realiseDate}</div>*/}
            {/*<div>{datas.previewText}</div>*/}
            {/*<hr/>*/}
            {/*<div>*/}
            {/*    <h3>Tearms</h3>*/}
            {/*    <ul>*/}
            {/*        {datas.terms.map((el, i) => <li key={i * 14}>*/}
            {/*            {el}*/}
            {/*        </li>)}*/}
            {/*    </ul>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <ul>*/}
            {/*        {state.dataAboutGame[1].mainText ? datas.mainText.map((el, i) => <li key={i * 114}>*/}
            {/*                <img src={datas.allImgsAndTitles[currentColor][i + 1]} alt="accessories img error"/>*/}
            {/*                <h3>*/}
            {/*                    {el.title}*/}
            {/*                </h3>*/}
            {/*                <ul>*/}
            {/*                    {el.descript.map((el, il) => <li key={il * 221}>{el}</li>)}*/}
            {/*                </ul>*/}
            {/*            </li>*/}
            {/*        ) : ""}*/}
            {/*    </ul>*/}
            {/*</div>*/}
        </div>
    )

}

export default AccessoriesPage;