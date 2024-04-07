import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {Link} from "react-router-dom";

function Friends() {
    const auth = useAuthUser(); //auth.map((el, i) => <li key={i * 23}> {el} </li>)
    return (
        <div className="profile__down">
            <h3>Friends</h3>
            <ul>
                {auth.friends.map(el => <Link to={"friends/" + el["_id"]} state={{profile: el}}>
                        <li key={Math.floor(Math.random() * 100 - 1)}>
                            <p>{el.userName}</p>
                            <img src={el.avatar} alt=""/>
                        </li>
                    </Link>
                )}
            </ul>
            <Link to="friends/add" className="profile__down--adder"> Add new friends</Link>
        </div>
    )
}

export default Friends;