import {useLocation} from "react-router-dom";

function NewsPage() {
    const {state} = useLocation();
    let imgCounter = 0;
    console.log(state.mainText, state.mainImgs)
    return (
        <div>
            <div>
                <p>
                    {state.dataTime}
                </p>
                <h1>{state.titleTop}</h1>
                <img src={state.topImg} alt=""/>
            </div>
            <div>
                <h3>
                    {state.headerTitle}
                </h3>
                <div>
                    <p>{state.authorName}</p>
                    <p>{state.authorDescription}</p>
                </div>
                <div>
                    {state.mainText.map((el) => {
                        if (el[0] === "P") {
                            if (!el[1]) {
                                imgCounter++
                                return (
                                    <img src={state.mainImgs[imgCounter]} alt=""/>
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
                                <img src={state.mainImgs[imgCounter]} alt=""/>
                            )
                        } else return (
                            <h2>
                                Video is here
                            </h2>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
// Работаю над исправлением отображения изображений
export default NewsPage;