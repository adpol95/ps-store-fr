import {Link} from "react-router-dom";
import {useState} from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

function Header() {
    const isAuthenticated = useIsAuthenticated()
    const auth = useAuthUser();
    const [profileClickState, setProfileClickState] = useState(false);
    const [notifState, setNotifState] = useState(true);
    const amountOfProdInCart = isAuthenticated() ? auth.cart.length : window.localStorage.length

    return (
        <div>
            <Link to="/">
                <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                    <g>
                        <g>
                            <path d="M5.8,32.1C4.3,33.1,4.8,35,8,35.9c3.3,1.1,6.9,1.4,10.4,0.8c0.2,0,0.4-0.1,0.5-0.1v-3.4l-3.4,1.1
       c-1.3,0.4-2.6,0.5-3.9,0.2c-1-0.3-0.8-0.9,0.4-1.4l6.9-2.4V27l-9.6,3.3C8.1,30.7,6.9,31.3,5.8,32.1z M29,17.1v9.7
       c4.1,2,7.3,0,7.3-5.2c0-5.3-1.9-7.7-7.4-9.6C26,11,23,10.1,20,9.5v28.9l7,2.1V16.2c0-1.1,0-1.9,0.8-1.6C28.9,14.9,29,16,29,17.1z
        M42,29.8c-2.9-1-6-1.4-9-1.1c-1.6,0.1-3.1,0.5-4.5,1l-0.3,0.1v3.9l6.5-2.4c1.3-0.4,2.6-0.5,3.9-0.2c1,0.3,0.8,0.9-0.4,1.4
       l-10,3.7V40L42,34.9c1-0.4,1.9-0.9,2.7-1.7C45.4,32.2,45.1,30.8,42,29.8z" fill="#0070d1"></path>
                        </g>
                    </g>
                </svg>
            </Link>
            <Link to="games"> Games </Link>
            <Link to="consoles"> Consoles </Link>
            <Link to="accessories"> Accessories </Link>
            <Link to="news"> News </Link>
            <Link to="psn"> PSN </Link>
            {isAuthenticated() ?
                <div>
                    <div onClick={() => setProfileClickState(!profileClickState)}>
                        <img src={auth.avatar} alt="" width="100px"/>
                    </div>
                    {profileClickState ? <div>
                            <ul>
                                <li><Link to="authorization/account-setting">Account settings</Link></li>
                                <li><Link to="authorization/logout">Sign out</Link></li>
                            </ul>
                        </div> :
                        ""}
                </div> :
                <Link to="authorization"> Sign in</Link>
            }
            <Link to="basket">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                         style={{fill: "rgba(0, 0, 0, 1)", transform: "", msFilter: ""}} >
                        <path
                            d="M21 9h-1.42l-3.712-6.496-1.736.992L17.277 9H6.723l3.146-5.504-1.737-.992L4.42 9H3a1.001 1.001 0 0 0-.965 1.263l2.799 10.264A2.005 2.005 0 0 0 6.764 22h10.473c.898 0 1.692-.605 1.93-1.475l2.799-10.263A.998.998 0 0 0 21 9zm-3.764 11v1-1H6.764L4.31 11h15.38l-2.454 9z"></path>
                        <path d="M9 13h2v5H9zm4 0h2v5h-2z"></path>
                    </svg>
                    <div>
                        {amountOfProdInCart}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Header;