import dataReader from "../../tools_dir/dataReader";
import {useEffect, useState} from "react";

function Console() {
    const [mainData, setMainData] = useState("");
    const [dataIsReady, setDataIsReady] = useState(false);
    useEffect(() => {
        fetch(process.env.REACT_APP_STATE1 + "/products/consoles")
            .then(r => r.json())
            .then(resp => {
                setMainData(resp.value);
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
                        {dataReader(mainData)}
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