import useSignOut from "react-auth-kit/hooks/useSignOut";
import {useNavigate} from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function Logout() {
    const signOut = useSignOut()
    const navigate = useNavigate();
    const auth = useAuthUser()

    return (
        <button onClick={() => {
            signOut();
            localStorage.clear();
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
                body: JSON.stringify({isOnline: false})
            })
                .then(res => {
                    console.log(res)
                })
                .catch(err => console.log(err))
            navigate("/");
            window.location.reload();
        }}>Sign Out</button>
    )
}

export default Logout;