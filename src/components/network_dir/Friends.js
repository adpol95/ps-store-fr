import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {Link} from "react-router-dom";

function Friends() {
    const auth = useAuthUser(); //auth.map((el, i) => <li key={i * 23}> {el} </li>)
    return (
        <div>
            <ul>
                {auth.friends.map(el => <Link to={"friends/" + el["_id"]} state={{profile: el}}>
                        <li key={Math.floor(Math.random() * 100 - 1)}>
                            {el.userName}
                            <img src={el.avatar} alt=""/>
                        </li>
                    </Link>
                )}
            </ul>
            <Link to="friends/add"> Add new friends</Link>
        </div>
    )
}

export default Friends;