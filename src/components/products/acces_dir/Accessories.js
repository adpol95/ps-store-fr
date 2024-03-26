import {useEffect, useState} from "react";
import Common from "../Common";

function Accessories() {
    const [mainData, setMainData] = useState("");
    const [dataIsReady, setDataIsReady] = useState(false);
    useEffect(() => {
        fetch(process.env.REACT_APP_STATE1 + "/newsAndProducts/listofnewsOrProducts", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({type: "accessories", index: "1"})
        })
            .then(r => r.json())
            .then(resp => {
                setMainData(resp);
                setDataIsReady(true);
            })
            .catch(err => {
                console.log(err)
            })

    }, [])
    return <Common mainData={mainData} data={dataIsReady}/>
}

export default Accessories;