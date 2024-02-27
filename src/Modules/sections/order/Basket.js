import {useEffect, useState} from "react";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import {Link} from "react-router-dom";
import counter from "./counterShipAndTax";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function Basket() {
    const auth = useAuthUser();
    const isAuth = useIsAuthenticated();
    const [dataCart, setDataCart] = useState(Object.values(window.localStorage).map(el => JSON.parse(el)));
    // const [dataCart, setDataCart] = useState(isAuth() ?
    //     Object.values(auth.currentProfile.activeGoods) : Object.values(window.localStorage).map(el => JSON.parse(el)));
    const [country, setCountry] = useState("Argentina");
    const calculProduct = {
        amount: dataCart.reduce((ac, cu) => ac + cu.amount, 0),
        prodPrice: +dataCart.reduce((ac, cu) => ac + cu.amount * cu.Price, 0).toFixed(2),
        shipPrice: counter(isAuth() ? auth.currentProfile.country : country)[0],
        taxPrice: counter(isAuth() ? auth.currentProfile.country : country)[1],
    }
    useEffect(() => {
        if (isAuth()) {
            // fetch(process.env.REACT_APP_STATE1 + "/authorization/" + auth.currentProfile["_id"], {
            //     method: "PATCH", // *GET, POST, PUT, DELETE, etc.
            //     mode: "cors", // no-cors, *cors, same-origin
            //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            //     credentials: "same-origin", // include, *same-origin, omit
            //     headers: {
            //         "Content-Type": "application/json",
            //         // 'Content-Type': 'application/x-www-form-urlencoded',
            //     },
            //     redirect: "follow", // manual, *follow, error
            //     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            //     body: JSON.stringify({activeGoods: {...window.localStorage}})
            // })
            //     .then(res => {
            //         console.log(res)
            //     })
            //     .catch(err => console.log(err))
        }
    }, []);
    return (
        <div>
            <div>
                <h3>Cart</h3>
                <ul>
                    {
                        dataCart.map((el, i) => <li key={Math.floor(Math.random() * 100 - 1) * i}>
                            <img src={el.img} alt="" width="100px"/>
                            <h4>{el.title}</h4>
                            <button onClick={(event) => {
                                localStorage.removeItem(el.title);
                                if (isAuth()) {
                                    // delete auth.currentProfile.activeGoods[el.title]
                                    // document.cookie = "_auth_state=" + JSON.stringify({
                                    //     currentProfile: {
                                    //         ...auth.currentProfile,
                                    //     }
                                    // })
                                    // fetch(process.env.REACT_APP_STATE1 + "/authorization/" + auth.currentProfile["_id"], {
                                    //     method: "PATCH", // *GET, POST, PUT, DELETE, etc.
                                    //     mode: "cors", // no-cors, *cors, same-origin
                                    //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                                    //     credentials: "same-origin", // include, *same-origin, omit
                                    //     headers: {
                                    //         "Content-Type": "application/json",
                                    //         // 'Content-Type': 'application/x-www-form-urlencoded',
                                    //     },
                                    //     redirect: "follow", // manual, *follow, error
                                    //     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                                    //     body: JSON.stringify({activeGoods: {...localStorage.getItem(el.title)}})
                                    // })
                                    //     .then(res => {
                                    //         console.log(res)
                                    //     })
                                    //     .catch(err => console.log(err))
                                }
                                window.location.reload();
                            }}>Remove
                            </button>
                            <div onClick={(event) => {
                                if (event.target.nodeName === "BUTTON") {
                                    localStorage.setItem(el.title, JSON.stringify({
                                        ...el,
                                        amount: event.target.innerText === "-" ? el.amount - 1 : event.target.innerText === "+" ? el.amount + 1 : ""
                                    }))
                                    if (isAuth()) {
                                        // document.cookie = "_auth_state=" + JSON.stringify({
                                        //     currentProfile: {
                                        //         ...auth.currentProfile,
                                        //         activeGoods: {
                                        //             ...auth.currentProfile.activeGoods, [el.title]: {
                                        //                 ...auth.currentProfile.activeGoods[el.title],
                                        //                 amount: event.target.innerText === "-" ? el.amount - 1 : event.target.innerText === "+" ? el.amount + 1 : ""
                                        //             }
                                        //         }
                                        //     }
                                        // })
                                        // fetch(process.env.REACT_APP_STATE1 + "/authorization/" + auth.currentProfile["_id"], {
                                        //     method: "PATCH", // *GET, POST, PUT, DELETE, etc.
                                        //     mode: "cors", // no-cors, *cors, same-origin
                                        //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                                        //     credentials: "same-origin", // include, *same-origin, omit
                                        //     headers: {
                                        //         "Content-Type": "application/json",
                                        //         // 'Content-Type': 'application/x-www-form-urlencoded',
                                        //     },
                                        //     redirect: "follow", // manual, *follow, error
                                        //     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                                        //     body: JSON.stringify({
                                        //         activeGoods: {
                                        //             ...auth.currentProfile.activeGoods, [el.title]: {
                                        //                 ...auth.currentProfile.activeGoods[el.title],
                                        //                 amount: event.target.innerText === "-" ? el.amount - 1 : event.target.innerText === "+" ? el.amount + 1 : ""
                                        //             }
                                        //         }
                                        //     })
                                        // })
                                        //     .then(res => {
                                        //         console.log(res)
                                        //     })
                                        //     .catch(err => console.log(err))
                                    }
                                    window.location.reload();
                                }
                            }}>
                                {el.Price}
                                <b>Quantity: </b>
                                <button>-</button>
                                {el.amount}
                                <button>+</button>
                            </div>
                            <div>
                                <img src={el.Age.ESRBImg} alt=""/>
                                <p>{el.Age.TopDescipt}</p>
                            </div>
                        </li>)
                    }
                </ul>
            </div>
            <div>
                {!isAuth() ?
                    <div>
                        <h3>Choose your country</h3>
                        <div onChange={(event) => setCountry(event.target.value)}>
                            <label htmlFor="Country/Region-select">Country/Region</label>
                            <select title="country">
                                <option id="country__AR">
                                    Argentina
                                </option>
                                <option id="country__AU">
                                    Australia
                                </option>
                                <option id="country__AT">
                                    Austria
                                </option>
                                <option id="country__BH">
                                    Bahrain
                                </option>
                                <option id="country__BE">
                                    Belgium
                                </option>
                                <option id="country__BO">
                                    Bolivia Plurinational State of
                                </option>
                                <option id="country__BR">
                                    Brazil
                                </option>
                                <option id="country__BG">
                                    Bulgaria
                                </option>
                                <option id="country__CA">
                                    Canada
                                </option>
                                <option id="country__CL">
                                    Chile
                                </option>
                                <option id="country__CO">
                                    Colombia
                                </option>
                                <option id="country__CR">
                                    Costa Rica
                                </option>
                                <option id="country__HR">
                                    Croatia
                                </option>
                                <option id="country__CY">
                                    Cyprus
                                </option>
                                <option id="country__CZ">
                                    Czech Republic
                                </option>
                                <option id="country__DK">
                                    Denmark
                                </option>
                                <option id="country__EC">
                                    Ecuador
                                </option>
                                <option id="country__SV">
                                    El Salvador
                                </option>
                                <option id="country__FI">
                                    Finland
                                </option>
                                <option id="country__FR">
                                    France
                                </option>
                                <option id="country__DE">
                                    Germany
                                </option>
                                <option id="country__GR">
                                    Greece
                                </option>
                                <option id="country__GT">
                                    Guatemala
                                </option>
                                <option id="country__HN">
                                    Honduras
                                </option>
                                <option id="country__HK">
                                    Hong Kong
                                </option>
                                <option id="country__HU">
                                    Hungary
                                </option>
                                <option id="country__IS">
                                    Iceland
                                </option>
                                <option id="country__IN">
                                    India
                                </option>
                                <option id="country__ID">
                                    Indonesia
                                </option>
                                <option id="country__IE">
                                    Ireland
                                </option>
                                <option id="country__IL">
                                    Israel
                                </option>
                                <option id="country__IT">
                                    Italy
                                </option>
                                <option id="country__JP">
                                    Japan
                                </option>
                                <option id="country__KR">
                                    Korea
                                </option>
                                <option id="country__KW">
                                    Kuwait
                                </option>
                                <option id="country__LB">
                                    Lebanon
                                </option>
                                <option id="country__LU">
                                    Luxembourg
                                </option>
                                <option id="country__CN">
                                    Mainland China
                                </option>
                                <option id="country__MY">
                                    Malaysia
                                </option>
                                <option id="country__MT">
                                    Malta
                                </option>
                                <option id="country__MX">
                                    Mexico
                                </option>
                                <option id="country__NL">
                                    Netherlands
                                </option>
                                <option id="country__NZ">
                                    New Zealand
                                </option>
                                <option id="country__NI">
                                    Nicaragua
                                </option>
                                <option id="country__NO">
                                    Norway
                                </option>
                                <option id="country__OM">
                                    Oman
                                </option>
                                <option id="country__PA">
                                    Panama
                                </option>
                                <option id="country__PY">
                                    Paraguay
                                </option>
                                <option id="country__PE">
                                    Peru
                                </option>
                                <option id="country__PL">
                                    Poland
                                </option>
                                <option id="country__PT">
                                    Portugal
                                </option>
                                <option id="country__QA">
                                    Qatar
                                </option>
                                <option id="country__RO">
                                    Romania
                                </option>
                                <option id="country__RU">
                                    Russia
                                </option>
                                <option id="country__SA">
                                    Saudi Arabia
                                </option>
                                <option id="country__SG">
                                    Singapore
                                </option>
                                <option id="country__SK">
                                    Slovakia
                                </option>
                                <option id="country__SI">
                                    Slovenia
                                </option>
                                <option id="country__ZA">
                                    South Africa
                                </option>
                                <option id="country__ES">
                                    Spain
                                </option>
                                <option id="country__SE">
                                    Sweden
                                </option>
                                <option id="country__CH">
                                    Switzerland
                                </option>
                                <option id="country__TW">
                                    Taiwan
                                </option>
                                <option id="country__TH">
                                    Thailand
                                </option>
                                <option id="country__TR">
                                    Turkey
                                </option>
                                <option id="country__UA">
                                    Ukraine
                                </option>
                                <option id="country__AE">
                                    United Arab Emirates
                                </option>
                                <option id="country__GB">
                                    United Kingdom
                                </option>
                                <option id="country__US">
                                    United States
                                </option>
                                <option id="country__UY">
                                    Uruguay
                                </option>
                            </select>
                        </div>
                    </div> : ""}
                <br/>
                <h3>Order summary</h3>
                <p>Items({calculProduct.amount}): {calculProduct.prodPrice}</p>
                <p> Shipping: {calculProduct.shipPrice}</p>
                <p> Region tax: {calculProduct.taxPrice}</p>
                <br/>
                <b>Total: {(calculProduct.shipPrice + calculProduct.taxPrice + calculProduct.prodPrice).toFixed(2)}</b>
                {<Link to="payment"
                       state={{cost: (calculProduct.shipPrice + calculProduct.taxPrice + calculProduct.prodPrice).toFixed(2), prod: dataCart.map(el => el.title)}}>
                    <button>Checkout</button>
                </Link>
                }

            </div>
        </div>
    )
}

// Шаблон для физичских копий игр https://preview.redd.it/tb0anht7pw6a1.png?width=640&crop=smart&auto=webp&s=81e586eee29442018675844ebb6d2216ac78df55
export default Basket;
