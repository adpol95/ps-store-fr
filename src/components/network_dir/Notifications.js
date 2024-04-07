import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {useState} from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function Notification() {
    const auth = useAuthUser();
    const [notifState, setNotifState] = useState(auth.reqForFriends.userName);
    const [clickState, setClickState] = useState(false);
    const [stateTest] = useState(!!window.document.cookie);
    const signIn = useSignIn();
    const authHeader = useAuthHeader()

    const senders = (event) => {
        event.preventDefault();
        if (event.target.innerText === "Accept") {
            fetch(process.env.REACT_APP_STATE1 + "/authorization/search", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify({name: auth.reqForFriends.userName})
            })
                .then(r => r.json())
                .then(response => {
                    const actualFriends = response[0].friends
                    fetch(process.env.REACT_APP_STATE1 + "/authorization/" + auth.reqForFriends["_id"], {
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
                        body: JSON.stringify({friends: [...actualFriends, {...auth}]})
                    })
                        .then(res => {
                            alert("Friend has been added");
                            console.log(res)

                        })
                        .catch(err => console.log(err))
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
                body: (event.target.innerText === "Accept") ?
                    JSON.stringify({friends: [...auth.friends, auth.reqForFriends], reqForFriends: {none: ""}}) :
                    JSON.stringify({reqForFriends: {none: ""}})
            })
                .then(res => {
                    console.log(res)
                    if (event.target.innerText === "Deny") alert("You deny invite from " + auth.reqForFriends.userName)
                    signIn({
                        auth: {
                            token: authHeader.slice(7),
                            type: 'Bearer',
                        },
                        // refresh: response.refToken,
                        userState: {
                            ...auth, friends: [...auth.friends, auth.reqForFriends],
                            reqForFriends: {none: ""}
                        }
                    })
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="notification">
            {stateTest ?
                <div className="notification__main">
                    <div onClick={() => setClickState(!clickState)} className="notification__main--logo">
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARdJREFUSEvVle0NwjAMRK+bwCYwCTAJMAlsApvAJsCLclUIDW1aFQn/iUTte/aRj0YzRzOzvroAW0nnDvBK0knSXdIurnnaIdaSEyIHXCQhdHx9JNkBFHEHAuRcE5Bz3mpTAIL7WLCOKzCg32IZcxcxl7WFGMCPt6iCOJ0NETcYy7A1nTSADXD3CAMgHhUbAMs8NVYCClMYYO/dvYEVjNYWTx6aNcDd5sAagKe33Uy1LAFq7Emb+ND7GSC3YuoErV7pqvhvQHroanYRuT7VRYsQ56Cwl8dEeuBCfemyGyPumvQ2+ACM/XPzhtrG8wm48LBpSnydYIpwZ+3QJ7Pr8ssfpUkAioFsooXc/bwBvTF0gl6hUsLsgCeagEQZ9+f34QAAAABJRU5ErkJggg=="
                            alt=""
                            className={notifState ? "notificationLogo" : ""}
                        />
                    </div>
                    {clickState ?
                        <div className="notification__details">
                            New
                            <ul>
                                {notifState ?
                                    <li key={2342}>
                                        <p><span>{auth.reqForFriends.userName}</span> invite you to be friends.</p>
                                        <div onClick={senders}>
                                            <button>Accept</button>
                                            <button>Deny</button>
                                        </div>
                                    </li> : ""
                                }
                            </ul>
                        </div> :
                        ""}
                </div> :
                ""
            }
        </div>
    )
}

export default Notification;