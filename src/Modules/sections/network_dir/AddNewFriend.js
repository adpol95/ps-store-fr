import {useEffect, useState} from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {Link} from "react-router-dom";

function AddNewFriend() {
    const [users, setUsers] = useState([]);
    const auth = useAuthUser().currentProfile;
    const [searchBarValue, setSearchBarValue] = useState("");
    const [preLoader, setPreLoader] = useState(false);

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
            body: JSON.stringify({reqForFriends: {...auth}})
        })
            .then(res => {
                alert("Request to be friends has been send");
                console.log(res)
            })
            .catch(err => console.log(err))
    }
    const findFriend = (event) => {
        event.preventDefault()
        fetch(process.env.REACT_APP_STATE1 + "/authorization/search", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({name: searchBarValue})
        })
            .then(r => r.json())
            .then(response => {
                setUsers(response.filter(el => el.userName !== auth.userName && auth.friends.every(el2 => el.userName !== el2.userName)))
                setPreLoader(false);
                console.log(response)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetch(process.env.REACT_APP_STATE1 + "/authorization")
            .then(r => r.json())
            .then(response => {
                setUsers(response.filter(el => el.userName !== auth.userName && auth.friends.every(el2 => el.userName !== el2.userName)))
            })
            .catch(err => console.log(err))
    }, []);
    return (
        <div className={preLoader ? "loader" : ""}>
            {!preLoader ?
                <div>
                    <p>Search for new friends</p>
                    <input value={searchBarValue} onChange={(event) => setSearchBarValue(event.target.value)}/>
                    <button onClick={(event) => {
                        setPreLoader(true);
                        return findFriend(event)
                    }}>Find
                    </button>
                </div> :
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
            <h3>All users</h3>
            {
                users.length ?
                    <ul>
                        {users.map((el, i) => {
                            return <li key={i * 23 + ""}>
                                <div>
                                    <Link to={"/psn/friends/" + el["_id"]} state={{ profile: el }}>
                                        <img src={el.avatar} alt="" width="150px"/>
                                        <p>{el.userName}</p>
                                        <button onClick={(event) => sendReq(event, el["_id"])}>Send request for
                                            friendship
                                        </button>
                                    </Link>
                                </div>
                            </li>
                        })}
                    </ul> :
                    <div>
                        User with this nickname does not exist
                    </div>
            }
        </div>
    )
}

export default AddNewFriend;