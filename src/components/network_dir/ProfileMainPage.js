import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import onlineDotGreen from "../../references/bxs-square-rounded-green.png";
import onlineDotRed from "../../references/bxs-square-rounded-red.png";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function ProfileMainPage() {
    let {state} = useLocation();
    const authPre = useAuthUser();
    const [auth, setAuth] = useState(state === null ? authPre : state.profile);
    const navigate = useNavigate();
    const signIn = useSignIn();
    const authHeader = useAuthHeader()
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
                signIn({
                    auth: {
                        token: authHeader.slice(7),
                        type: 'Bearer',
                    },
                    // refresh: response.refToken,
                    userState: {
                        ...authPre, friends: [...authPre.friends.filter(el => el["_id"] !== auth["_id"])]
                    }
                })
                window.location.reload();
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
            .then(() => {
                alert("Friend has been deleted");
                navigate("/psn");
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="profile-main">
            <div className="profile-main__head">
                <div className="profile-main__left">
                    <div className="profile-main__status">
                        <div className="onlineDot">
                            <img src={auth.isOnline ? onlineDotGreen : onlineDotRed} alt=""/>
                        </div>
                    </div>
                    <div className="profile-main__avatar">
                        <img src={auth.avatar} alt="Profile pic"/>
                    </div>
                </div>
                <div className="profile-main__right">
                    <h2>{auth.userName}</h2>
                    <p><span>{auth.country}</span></p>
                    <p>Birthday: <span><i>{auth.birthDay.trimEnd().replace(/\s/gi, ".")}</i></span></p>
                    <p>Amount of friends: <span>{auth.friends.length}</span></p>
                    <p>Wallet: <span>{auth.wallet}</span></p>
                    <div>
                        <h3>Library</h3>
                        <p><b><i>Games:</i></b></p>
                        <ul>
                            {auth.ownership.games.map(el => <li key={Math.random() * 100 - 1}> {el.name} </li>)}
                        </ul>
                        <p><b><i>Consoles:</i></b></p>
                        <ul>
                            {auth.ownership.consoles.map(el => <li key={Math.random() * 100 - 1}> {el.name} </li>)}
                        </ul>
                        <p><b><i>Accessories:</i></b></p>
                        <ul>
                            {auth.ownership.accessories.map(el => <li key={Math.random() * 100 - 1}> {el.name} </li>)}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="profile-main__mid">
                <div className="profile-main__favorite-main">
                    <div className="profile-main__favorite-main--studios">
                        <h3>Favorite studios:</h3>
                        <ul>
                            {
                                auth.favorite.studios.map((el, i) => <li key={Math.random() * 100 - 1}>
                                    {el}
                                    {i !== auth.favorite.studios.length - 1 ? "," : ""}
                                </li>)
                            }
                        </ul>
                    </div>
                    <div className="profile-main__favorite-main--games">
                        <h3>Favorite games:</h3>
                        <ul>
                            {
                                auth.favorite.games.map(el => <li key={Math.random() * 100 - 1}>
                                    <img src={el.img} alt="" width="50px"/>
                                </li>)
                            }
                        </ul>
                    </div>
                </div>
                {state !== null ?
                    <div>
                        <p>Delete this friend</p>
                        <button onClick={deleter}>Delete</button>
                    </div> : ""
                }
            </div>
        </div>
    )
}

export default ProfileMainPage;