import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

function ConsolePage() {
    let [currentPage, setCurrentPage] = useState(0);
    const {state} = useLocation();
    const [datsAboutGame, setDatsAboutGame] = useState("");
    const [datas, setDatas] = useState([]);
    const [dataIsReady, setDataIsReady] = useState(false);
    useEffect(() => {
        fetch(process.env.REACT_APP_STATE1 + "/newsAndProducts/page", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({type: "consoles",name: state.curTitle})
        })
            .then(r => r.json())
            .then(resp => {
                setDatsAboutGame(resp[0].value);
                setDatas(Object.values(resp[0].value))
                setDataIsReady(true);
            })
            .catch(err => {
                console.log(err)
            })

    }, [])
    return (
        <div onClick={(event) => {
            if (event.target.innerText === '<' && currentPage > 0) {
                setCurrentPage(currentPage - 1)
            } else if (event.target.innerText === '>' && currentPage !== datas[1].length - 1) {
                setCurrentPage(currentPage + 1)
            }
        }} className={!dataIsReady ? "loader" : ""}>
            {dataIsReady ?
                <div>
                    <h1>
                        {state.curTitle}
                    </h1>
                    <button>
                        &lt;
                    </button>
                    <img src={datas[1][currentPage]} alt="" style={{width: "300px"}}/>
                    <button>
                        &gt;
                    </button>
                    <div>{datas[3]}</div>
                    <div>Realise date: {datas[2]}</div>
                    <hr/>
                    <div>
                        <h3>Tearms</h3>
                        <ul>
                            {datas[4].map((el, i) => <li key={i * 14}>{el}</li>)}
                        </ul>
                    </div>
                    <div>
                        <ul>
                            {datsAboutGame.mainText ? datas[5].map((el, i) => <li key={i * 114}>
                                    <img src={datas[1][i + 1]} alt="console img error"/>
                                    <h3>
                                        {el.title}
                                    </h3>
                                    <ul>
                                        {el.descript.map((el, il) => <li key={il * 221}>{el}</li>)}
                                    </ul>
                                </li>
                            ) : ""}
                        </ul>
                    </div>
                    <div>

                        <h3>
                            {datsAboutGame.whatInTheBox ? 'What in the box' : ''}
                        </h3>
                        <ul>
                            {datsAboutGame.whatInTheBox ? datas[6].map((el, i) => <li key={i * 25}> {el}</li>) : ""}
                        </ul>
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
    )
}

export default ConsolePage;
