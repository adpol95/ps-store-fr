import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Friends from "./Friends";
import {useEffect, useState} from "react";

function Profile() {
    const auth = useAuthUser().currentProfile;

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
            <img src={auth.avatar} alt="Profile pic"/>
            <div>
                <h2>{auth.userName}</h2>
                <p>{auth.country}</p>
                <p>Birthday: <i>{auth.birthDay.trimEnd().replace(/\s/gi, ".")}</i></p>
                <p>Amount of friends: {auth.friends.length}</p>
                <p>Wallet: {}</p>
            </div>
            <div>
                Favorite studios:
            </div>
            {dataIsReady ?
                <div>
                    Most selling games
                    <ol>
                        {mainData.map((el, i) => {
                            const readyTitle = el.title.includes('&#x27;') ? el.title.replace(/&#x27;/g, `'`) : el.title;
                            return <li key={i * 54}>
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