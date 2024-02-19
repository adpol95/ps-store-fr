import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {useState} from "react";

function Notification() {
    const auth = useAuthUser().currentProfile;
    const [notifState, setNotifState] = useState(auth.reqForFriends.name);
    const [clickState, setClickState] = useState(false);
    const [stateTest] = useState(!!window.document.cookie);

    const senders = (event) => {
        event.preventDefault();


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
                JSON.stringify({friends: [auth.reqForFriends], reqForFriends: {none: ""}}) :
                JSON.stringify({reqForFriends: {none: ""}})
        })
            .then(res => {
                console.log(event.target.innerText === "Accept" ? res : "You deny invite from " + auth.reqForFriends.name)
                document.cookie = "_auth_state=" + JSON.stringify({
                    currentProfile: {
                        ...auth,
                        friends: [...auth.friends, auth.reqForFriends],
                        reqForFriends: {none: ""}
                    }
                })
                window.location.reload();
            })
            .catch(err => console.log(err))
        if (event.target.innerText === "Accept") {
            fetch(process.env.REACT_APP_STATE1 + "/authorization/" + auth.reqForFriends.id, {
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
                body: JSON.stringify({friends: [{id: auth["_id"], name: auth.userName, img: auth.avatar}]})
            })
                .then(res => {
                    alert("Friend has been added");
                    console.log(res)
                    window.location.reload();
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div>
            {stateTest ?
                <div>
                    <div onClick={() => setClickState(!clickState)}>
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARdJREFUSEvVle0NwjAMRK+bwCYwCTAJMAlsApvAJsCLclUIDW1aFQn/iUTte/aRj0YzRzOzvroAW0nnDvBK0knSXdIurnnaIdaSEyIHXCQhdHx9JNkBFHEHAuRcE5Bz3mpTAIL7WLCOKzCg32IZcxcxl7WFGMCPt6iCOJ0NETcYy7A1nTSADXD3CAMgHhUbAMs8NVYCClMYYO/dvYEVjNYWTx6aNcDd5sAagKe33Uy1LAFq7Emb+ND7GSC3YuoErV7pqvhvQHroanYRuT7VRYsQ56Cwl8dEeuBCfemyGyPumvQ2+ACM/XPzhtrG8wm48LBpSnydYIpwZ+3QJ7Pr8ssfpUkAioFsooXc/bwBvTF0gl6hUsLsgCeagEQZ9+f34QAAAABJRU5ErkJggg=="
                            alt=""
                            className={notifState ? "notificationLogo" : ""}
                        />
                    </div>
                    {clickState ?
                        <div>
                            New
                            <ul>
                                {notifState ?
                                    <li key={2342}>
                                        <p>{auth.reqForFriends.name} invite you to be friends.</p>
                                        <form onSubmit={senders}>
                                            <button type="submit">Accept</button>
                                            <button type="submit">Deny</button>
                                        </form>
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