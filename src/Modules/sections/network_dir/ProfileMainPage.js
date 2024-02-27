import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import onlineDotGreen from "../../../References/bxs-square-rounded-green.png";
import onlineDotRed from "../../../References/bxs-square-rounded-red.png";

function ProfileMainPage() {
    let {state} = useLocation();
    const authPre = useAuthUser().currentProfile;
    const [auth, setAuth] = useState(state === null ? authPre : state.profile);
    const navigate = useNavigate();

    useEffect(() => {
        if (state !== null) {
            fetch(process.env.REACT_APP_STATE1 + "/authorization/search", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({name: auth.userName})
            })
                .then(r => r.json())
                .then(response => {
                    setAuth(response[0])
                })
                .catch(err => console.log(err))
        }
    }, []);

    const deleter = (e) => {
        e.preventDefault();
        fetch(process.env.REACT_APP_STATE1 + "/authorization/" + authPre["_id"], {
            method: "PATCH", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({friends: [...authPre.friends.filter(el => el["_id"] !== auth["_id"])]})
        })
            .then(res => {
                console.log(res)
                document.cookie = "_auth_state=" + JSON.stringify({
                    currentProfile: {
                        ...authPre,
                        friends: [...authPre.friends.filter(el => el["_id"] !== auth["_id"])],
                    }
                })
            })
            .catch(err => console.log(err))

        fetch(process.env.REACT_APP_STATE1 + "/authorization/" + auth["_id"], {
            method: "PATCH", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({friends: [...auth.friends.filter(el => el["_id"] !== authPre["_id"])]})
        })
            .then(res => {
                alert("Friend has been deleted");
                console.log(res)
                window.location.reload();
                navigate("/psn");
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <div>Status:</div>
            <div className="onlineDot">
                <img src={auth.isOnline ? onlineDotGreen : onlineDotRed} alt=""/>
            </div>
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
                <ul>
                    {
                        auth.favorite.studios.map(el => <li key={Math.random() * 100 - 1}>
                            {el}
                        </li>)
                    }
                </ul>
                Favorite games:
                <ul>
                    {
                        auth.favorite.games.map(el => <li key={Math.random() * 100 - 1}>
                            <img src={el.img} alt="" width="50px"/>
                        </li>)
                    }
                </ul>
            </div>
            {state !== null ?
                <div>
                    <p>Delete this friend</p>
                    <button onClick={deleter}>Delete</button>
                </div> : ""
            }
        </div>
    )
}

export default ProfileMainPage;