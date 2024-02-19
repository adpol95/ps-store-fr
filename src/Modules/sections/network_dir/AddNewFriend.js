import {useEffect, useState} from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function AddNewFriend() {
    const [users, setUsers] = useState([]);
    const auth = useAuthUser().currentProfile;

    const sendReq = (event, id) => {
        event.preventDefault();
        fetch(process.env.REACT_APP_STATE1 + "/authorization/" + id, {
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
            body: JSON.stringify({reqForFriends: {id: auth["_id"], name: auth.userName, img: auth.avatar}})
        })
            .then(res => {
                alert("Request to be friends has been send");
                console.log(res)
            })
            .catch(err => console.log(err))

    }

    useEffect(() => {
        fetch(process.env.REACT_APP_STATE1 + "/authorization")
            .then(r => r.json())
            .then(response => {
                setUsers(response.filter(el => el.userName !== auth.userName && auth.friends.every(el2 => el.userName !== el2.name)))
            })
            .catch(err => console.log(err))
    }, []);
    return (
        <div>
            <h3>All users</h3>
            <ul>
                {users.map((el, i) => <li key={i * 23}>
                    <div>
                        <form onSubmit={sendReq}></form>
                        <img src={el.avatar} alt="" width="150px"/>
                        <p>{el.userName}</p>
                        <button type="submit" onClick={(event) => sendReq(event, el["_id"])}>Send request for friendship</button>
                    </div>
                </li>)}
            </ul>
        </div>
    )
}

export default AddNewFriend;