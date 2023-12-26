import {useLocation} from "react-router-dom";

function ConsolePage() {
    let {state} = useLocation();
    let titles = Object.keys(state.dataAboutGame[1]);
    let datas = Object.values(state.dataAboutGame[1]);
    console.log(state)
    return (
        <div>
            <h1>
                {state.dataAboutGame[0]}
           </h1>
           <img src={datas.shift()} alt="" style={{width: "300px"}}/>
        </div>
    )
}

export default ConsolePage;