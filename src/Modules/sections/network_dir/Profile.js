import Friends from "./Friends";
import {useEffect, useState} from "react";
import ProfileMainPage from "./ProfileMainPage";

function Profile() {

    const [mainData, setMainData] = useState([]);
    const [dataIsReady, setDataIsReady] = useState(false);

    useEffect(() => {
        fetch(process.env.REACT_APP_STATE1 + "/newsAndProducts/listofnewsOrProducts", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({type: "games", index: "1"})
        })
            .then(r => r.json())
            .then(resp => {
                setMainData(resp.slice(0, 10));
                setDataIsReady(true);
            })
            .catch(err => {
                console.log(err)
            })

    }, [])
    return (
        <div>
            <ProfileMainPage/>
            {dataIsReady ?
                <div>
                    Most selling games
                    <ol>
                        {mainData.map((el, i) => {
                            const readyTitle = el.title.includes('&#x27;') ? el.title.replace(/&#x27;/g, `'`) : el.title;
                            return <li key={(i + 1) * 54}>
                                <img src={el.img} alt="" width="50px"/>
                                {readyTitle}
                            </li>
                        })}
                    </ol>
                </div> :
                <div className="lds-ring" style={{height: "500px"}}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
            <div>
                Earn some money
            </div>
            <Friends/>
        </div>
    )
}

export default Profile;