import Friends from "./Friends";
import {useEffect, useState} from "react";
import ProfileMainPage from "./ProfileMainPage";
import {Link} from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function Profile() {

    const [mainData, setMainData] = useState([]);
    const [dataIsReady, setDataIsReady] = useState(false);
    const [studios, setStudios] = useState([]);
    const [favStudio, setFavStudio] = useState("");
    const auth = useAuthUser();
    const signIn = useSignIn();
    const authHeader = useAuthHeader()


    useEffect(() => {
        fetch(process.env.REACT_APP_STATE1 + "/newsAndProducts/listofnewsOrProducts", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({type: "games", index: "1"})
        })
            .then(r => r.json())
            .then(resp => {
                setMainData(resp.slice(0, 10));
                setDataIsReady(true);
            })
            .catch(err => {
                console.log(err)
            })
        fetch(process.env.REACT_APP_STATE1 + "/newsAndProducts/listofnewsOrProducts", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({type: "games", favorite: true})
        })
            .then(r => r.json())
            .then(resp => {
                const readyArrStuios = resp.map(el => el.Developer);
                setStudios(readyArrStuios.filter((el1, i) => i === readyArrStuios.indexOf(el1)));
                setDataIsReady(true);
            })
            .catch(err => {
                console.log(err)
            })

    }, [])
    useEffect(() => {
        if (favStudio) {
            if (auth.favorite.studios.every(el => el !== favStudio)) {
                fetch(process.env.REACT_APP_STATE1 + "/authorization/" + auth["_id"], {
                    method: "PATCH", // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({favorite: {...auth.favorite, studios: [...auth.favorite.studios, favStudio]}})
                })
                    .then(resp => {
                        signIn({
                            auth: {
                                token: authHeader.slice(7),
                                type: 'Bearer',
                            },
                            // refresh: response.refToken,
                            userState: {
                                ...auth, favorite: {...auth.favorite, studios: [...auth.favorite.studios, favStudio]}
                            }
                        })
                        alert(favStudio + " has been added to your list of favorite studios");
                        console.log(resp)
                        window.location.reload();
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else alert(favStudio + " was already added to your list of favorite studios")
        }
    }, [favStudio])
    return (
        <div>
            <ProfileMainPage/>
            {dataIsReady ?
                <div>
                    Most selling games
                    <ol>
                        {mainData.map((el, i) => {
                            const readyTitle = el.title.includes('&#x27;') ? el.title.replace(/&#x27;/g, `'`) : el.title;
                            return <Link to={"/games/" + el["_id"]} state={{curTitle: readyTitle}}>
                                <li key={(i + 1) * 54}>
                                    <img src={el.img} alt="" width="50px"/>
                                    {readyTitle}
                                </li>
                            </Link>
                        })}
                    </ol>
                </div> :
                <div className="lds-ring" style={{height: "500px"}}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
            <div>
                Famous studios:
                <ul onClick={(event) => setFavStudio(event.target.value)}>
                    {studios.map(el => <li key={Math.random() * 100 - 1}>
                        <p>{el}</p>
                        <button value={el}>Add</button>
                    </li>)}
                </ul>
            </div>
            <div>
                <Link to="/conundrums">
                Earn some money
                </Link>
            </div>
            <Friends/>
        </div>
    )
}

export default Profile;