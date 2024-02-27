import {Link, useLocation} from "react-router-dom";

function Payment() {
    const {state} = useLocation();
    return (
        <div>
            <h3>Total cost: {state.cost}</h3>
            <h3><Link to="/authorization">Login</Link> or <Link to="/conundrums">earn our ecosystem coins</Link></h3>
        </div>
    )
}

export default Payment;