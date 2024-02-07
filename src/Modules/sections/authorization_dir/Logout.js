import useSignOut from "react-auth-kit/hooks/useSignOut";
import {useNavigate} from "react-router-dom";

function Logout() {
    const signOut = useSignOut()
    const navigate = useNavigate();

    return (
        <button onClick={() => {
            signOut();
            navigate("/");
            window.location.reload();
        }}>Sign Out</button>
    )
}

export default Logout;