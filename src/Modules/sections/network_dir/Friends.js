import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {Link} from "react-router-dom";

function Friends() {
    const auth = useAuthUser().currentProfile; //auth.map((el, i) => <li key={i * 23}> {el} </li>)
    return (
        <div>
            <ul>
                {auth.friends.map((el, i) => <li key={i * 56}>
                    {el.name}
                    <img src={el.img} alt=""/>
                </li>)}
            </ul>
            <Link to="friends/add"> Add new friends</Link>
        </div>
    )
}

export default Friends;