import {Link, useLocation, useNavigate} from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function Payment() {
    const {state} = useLocation();
    const auth = useAuthUser();
    const isAuth = useIsAuthenticated();
    const navigate = useNavigate();
    const signIn = useSignIn();
    const authHeader = useAuthHeader()
    return (
        <div className="products-list payment">
            <div className="products-list__top">
                <div>
                    <h3>PAYMENT</h3>
                </div>
            </div>
            <div className="payment__main">
                <h3>Total cost: {state.cost}</h3>
                {isAuth() ? <div>
                    <div style={{paddingBottom: "1em"}}>Your wallet: {auth.wallet}</div>
                    {auth.wallet < state.cost ?
                        <button disabled> You have not enough money for paying this order</button> :
                        <button onClick={(event) => {
                            event.preventDefault()
                            const shell = {
                                games: [...auth.ownership.games, ...state.prod.filter(el => el.type === "Games")],
                                consoles: [...auth.ownership.consoles, ...state.prod.filter(el => el.type === "Consoles")],
                                accessories: [...auth.ownership.accessories, ...state.prod.filter(el => el.type === "Accessories")]
                            };
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
                                body: JSON.stringify({
                                    ownership: shell,
                                    wallet: auth.wallet - state.cost,
                                    cart: []
                                })
                            })
                                .then(res => {
                                    console.log(res)
                                    signIn({
                                        auth: {
                                            token: authHeader.slice(7),
                                            type: 'Bearer',
                                        },
                                        // refresh: response.refToken,
                                        userState: {
                                            ...auth,
                                            ownership: shell,
                                            wallet: auth.wallet - state.cost,
                                            cart: []
                                        }
                                    })
                                    alert("Congrats with your new purchase")
                                    localStorage.clear();
                                    navigate("/psn");
                                    window.location.reload();
                                })
                                .catch(err => console.log(err))
                        }}>Finish your order and pay</button>}


                </div> : <div>
                    <h3 style={{color: "black"}}>To make a payment you have to <Link to="/authorization/registration">register</Link>, <Link to="/authorization"  >login</Link> or <Link to="/conundrums">earn our
                        ecosystem coins.</Link></h3>
                </div>
                }</div>
        </div>
    )
}

export default Payment;