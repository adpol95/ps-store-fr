import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";

function Login() {

    const [loginIn, setLoginIn] = useState('');
    const [passwordIn, setPasswordIn] = useState('');
    const signIn = useSignIn()
    const navigate = useNavigate();

    const submiter = (event) => {
        event.preventDefault();
        fetch(process.env.REACT_APP_STATE1 + "/authorization/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({userName: loginIn, password: passwordIn}), // body data type must match "Content-Type" header
        })
            .then(res => res.json())
            .then(response => {
                if (signIn({
                    auth: {
                        token: response.token,
                        type: 'Bearer',
                    },
                    // refresh: response.refToken,
                    userState: {currentProfile: response.profile}
                })) {
                    navigate("/psn");
                    window.location.reload();
                    alert(response.message)
                }

            })
            .catch(err => {
                console.log(err);
                alert("Something goes wrong. Try again later")
            })
    }


    return (
        <div>
            <h2>Sign in</h2>
            <form onSubmit={submiter}>
                <div>
                    <label>
                        <input
                            type="text"
                            value={loginIn}
                            onChange={(event) => setLoginIn(event.target.value)}
                            placeholder="User name"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="password"
                            value={passwordIn}
                            onChange={(event) => setPasswordIn(event.target.value)}
                            placeholder="Password"
                        />
                    </label>
                </div>
                <button type="submit">
                    Submit
                </button>
                <h2>Don't have an a account ? <Link to="registration"> Register!</Link></h2>
            </form>
        </div>
    )
}

export default Login;