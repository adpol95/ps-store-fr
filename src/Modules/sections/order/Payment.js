import {Link, useLocation, useNavigate} from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

function Payment() {
    const {state} = useLocation();
    const auth = useAuthUser();
    const isAuth = useIsAuthenticated();
    const navigate = useNavigate();
    return (
        <div>
            <h3>Total cost: {state.cost}</h3>
            {isAuth() ? <div>
                Your wallet: {auth.currentProfile.wallet}
                {
                    auth.currentProfile.wallet < state.cost ?
                        <button disabled> You have not enough money for paying this order</button> :
                        <button onClick={(event) => {
                            event.preventDefault()
                            const shell = {...auth.currentProfile.ownership, games: [...auth.currentProfile.ownership.games, [...state.prod]]};
                            fetch(process.env.REACT_APP_STATE1 + "/authorization/" + auth.currentProfile["_id"], {
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
                                body: JSON.stringify({ownership: shell, wallet: auth.currentProfile.wallet - state.cost})
                            })
                                .then(res => {
                                    console.log(res)
                                    document.cookie = "_auth_state=" + JSON.stringify({
                                        currentProfile: {
                                            ...auth.currentProfile,
                                            ownership: shell,
                                            wallet: auth.currentProfile.wallet - state.cost
                                        }
                                    })
                                    alert("Congrats with your new purchase")
                                    localStorage.clear();
                                    navigate("/psn");
                                    window.location.reload();
                                })
                                .catch(err => console.log(err))
                        }}>Finish your order and pay</button>

                }

            </div> : <div>
                <h3><Link to="/authorization/registration">Register</Link> and <Link to="/conundrums">earn our ecosystem coins</Link></h3>
            </div>
            }
        </div>
    )
}

export default Payment;