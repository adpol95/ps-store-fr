import {useEffect, useState} from "react";
import dataReader from "../../tools_dir/dataReader";

function Accessories() {
    const [mainData, setMainData] = useState("");
    const [dataIsReady, setDataIsReady] = useState(false);
    useEffect(() => {
        fetch(process.env.REACT_APP_STATE1 + "/products/accessories")
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

export default Accessories;