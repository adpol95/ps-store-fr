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
                    userState: {...response.profile, isOnline: true}
                })) {
                    fetch(process.env.REACT_APP_STATE1 + "/authorization/" + response.profile["_id"], {
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
                        body: JSON.stringify({isOnline: true})
                    })
                        .then(res => {
                            navigate("/psn");
                            window.location.reload();
                        })
                        .catch(err => console.log(err))

                }
            })
            .catch(err => {
                console.log(err);
                alert("Something goes wrong. Try again later")
            })
    }


    return (
        <div className="products-list news-list sign-in">
            <div className="products-list__top">
                <div>
                    <h3>SIGN IN</h3>
                </div>
            </div>
            <form onSubmit={submiter} className="sign-in__form">
                <div className="sign-in__container">
                    <div className="sign-in__nick">
                        <label>
                            <input
                                type="text"
                                value={loginIn}
                                onChange={(event) => setLoginIn(event.target.value)}
                                placeholder="User name"
                            />
                        </label>
                    </div>
                    <div className="sign-in__password">
                        <label>
                            <input
                                type="password"
                                value={passwordIn}
                                onChange={(event) => setPasswordIn(event.target.value)}
                                placeholder="Password"
                            />
                        </label>
                    </div>
                </div>
                <button type="submit" className="sign-in__accept-btn">
                    Submit
                </button>
                <h3>Don't have an a account ? <Link to="registration"> Register!</Link></h3>
            </form>
        </div>
    )
}

export default Login;
