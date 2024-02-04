import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";

function Authorization() {

    const [loginIn, setLoginIn] = useState('');
    const [passwordIn, setPasswordIn] = useState('');
    const signIn = useSignIn()

    const submiter = (event) => {
        event.preventDefault();
        fetch("http://localhost:5000/authorization/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({userName: loginIn, password: passwordIn}), // body data type must match "Content-Type" header
        })
            .then(res => res.json())
            .then(response => {
                signIn({
                    auth: {
                        token: response.token,
                        type: 'Bearer'
                    },
                    userState: {
                        name: loginIn,
                    }
                })
            })
            .catch(err => console.log(err))
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
                {/*      <p>Don't have an account? <br/>*/}
                {/*          <span className="to-do-list__register"*/}
                {/*                onClick={(event) => {*/}
                {/*                    event.preventDefault();*/}
                {/*                    navigate('/login')*/}
                {/*                }}>*/}
                {/*  Register!*/}
                {/*</span>*/}
                {/*      </p>*/}
                <h2>Dont have account ? <Link to="registration"> Register!</Link></h2>
            </form>
        </div>
    )
}

export default Authorization;