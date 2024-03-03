import Notifications from "./Notifications";
import {Outlet} from "react-router-dom";

function MainNet() {
    return (
        <div>
            <Notifications/>
            <Outlet/>
        </div>
    )
}

export default MainNet;