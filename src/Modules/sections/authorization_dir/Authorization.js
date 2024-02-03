import {Link} from "react-router-dom";

function Authorization() {
    return (
        <div>
            <h1>Login</h1>
            <h2>Dont have account ? <Link to="registration"> Register!</Link></h2>
        </div>
    )
}

export default Authorization;