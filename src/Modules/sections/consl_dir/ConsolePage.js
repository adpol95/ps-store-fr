import {useLocation} from "react-router-dom";
import {useState} from "react";

function ConsolePage() {
    let {state} = useLocation();
    let titles = Object.keys(state.dataAboutGame[1]);
    let datas = Object.values(state.dataAboutGame[1]);
    let [currentPage, setCurrentPage] = useState(0);
    return (
        <div onClick={(event) => {
            if (event.target.innerText === '<' && currentPage > 0) {
                setCurrentPage(currentPage - 1)
            } else if (event.target.innerText === '>' && currentPage !== datas[1].length - 1) {
                setCurrentPage(currentPage + 1)
            }
        }}>
            <h1>
                {state.dataAboutGame[0]}
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
                    {state.dataAboutGame[1].mainText ? datas[5].map((el, i) => <li key={i * 114}>
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
                    {state.dataAboutGame[1].whatInTheBox ? 'What in the box' : ''}
                </h3>
                <ul>
                    {state.dataAboutGame[1].whatInTheBox ? datas[6].map((el, i) => <li key={i * 25}> {el}</li>) : ""}
                </ul>
            </div>
        </div>
    )
}

export default ConsolePage;