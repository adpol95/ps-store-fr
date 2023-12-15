import {useLocation} from "react-router-dom";

function ConsolePage() {
    // let {state} = useLocation();
    // let titles = Object.keys(state.dataAboutGame[1]);
    // let datas = Object.values(state.dataAboutGame[1]);
    // titles.shift();
    // console.log(state.dataAboutGame)
    return (
        <div>
            {/*<h1>*/}
            {/*    {state.dataAboutGame[0]}*/}
            {/*</h1>*/}
            {/*<img src={datas.shift()} alt="" style={{width: "300px"}}/>*/}
            {/*<ul>*/}
            {/*    {titles.map((el, i) => <li key={i * 12}>*/}
            {/*        {el + " " + datas[i]}*/}
            {/*    </li>)}*/}
            {/*</ul>*/}
        </div>
    )
}

export default ConsolePage;