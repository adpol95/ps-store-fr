import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function Console() {
    const [mainData, setMainData] = useState("");
    const [dataIsReady, setDataIsReady] = useState(false);
    useEffect(() => {
        fetch(process.env.REACT_APP_STATE1 + "/products/listofconsoles")
            .then(r => r.json())
            .then(resp => {
                setMainData(resp);
                setDataIsReady(true);
            })
            .catch(err => {
                console.log(err)
            })

    }, [])
    return (
        <div className={!dataIsReady ? "loader" : ""}>
            {
                dataIsReady ?
                    <ul>
                        {mainData.map((el, i) => {
                            const mainId = i + 1;
                            const readyTitle = el.title.includes('&#x27;') ? el.title.replace(/&#x27;/g, `'`) : el.title
                            return <li key={mainId}>
                                <Link to={mainId + ""} state={{curTitle: readyTitle}}>
                                    {readyTitle}
                                    <img src={el.img} alt="" style={{width: "100px"}}/>
                                </Link>
                            </li>
                        })}
                    </ul> :
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
            }
        </div>
    );
}

export default Console;