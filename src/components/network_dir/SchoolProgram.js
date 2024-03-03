import {useEffect, useState} from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function SchoolProgram() {
    const auth = useAuthUser();
    const [refQuestions, setRefQuestions] = useState("");
    const [questions, setQuestions] = useState("");
    const [dataIsReady, setDataIsReady] = useState(false);
    const condLocal = window.localStorage.length ? JSON.parse(window.localStorage.getItem("condition")) : [];
    const dateNow = Math.floor(Date.now() / 1000);
    useEffect(() => {
        if (!questions) {
            fetch(process.env.REACT_APP_STATE1 + "/conundrums", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({type: "schoolPrg"})
            })
                .then(r => r.json())
                .then(resp => {
                    setRefQuestions(resp[0].schoolPrg);
                    setQuestions(resp[0].schoolPrg.filter((el, i) => !auth.solved.schoolPrg.includes(i)));
                    setDataIsReady(true);
                    if (!window.localStorage.length || dateNow > JSON.parse(window.localStorage.getItem("expired"))) {
                        window.localStorage.setItem("condition", JSON.stringify(
                            resp[0].schoolPrg.map(el => el[4])
                        ));
                        window.localStorage.setItem("expired", JSON.stringify(
                            dateNow + 300
                        ));
                    }
                    })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [])
    return (
        <div>
            <h3>School Program</h3>
            {dataIsReady ? <div>
                <ol>
                    {questions.map((el, i) => <li key={Math.random() * 100 - 1} onClick={(event) => {
                        if (event.target.innerText === el[2] && event.target.nodeName === "BUTTON") {
                            fetch(process.env.REACT_APP_STATE1 + "/authorization/" + auth["_id"], {
                                method: "PATCH", // *GET, POST, PUT, DELETE, etc.
                                headers: {
                                    "Content-Type": "application/json",
                                    // 'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                body: JSON.stringify({
                                    wallet: auth.wallet + 100,
                                    solved: {
                                        ...auth.solved,
                                        schoolPrg: auth.solved.schoolPrg + refQuestions.indexOf(el)
                                    }
                                })
                            })
                                .then(res => {
                                    document.cookie = "_auth_state=" + JSON.stringify({
                                        ...auth,
                                        wallet: auth.wallet + 50,
                                        solved: {
                                            ...auth.solved,
                                            schoolPrg: auth.solved.schoolPrg + refQuestions.indexOf(el)
                                        }
                                    }) + ";path=/"
                                    alert("Your are right! Congrats! You deserve 50 points, its going to your wallet");
                                    alert(el[3]);
                                    console.log(res)
                                    window.location.reload();
                                })
                                .catch(err => console.log(err))
                        } else if (event.target.innerText !== el[2] && event.target.nodeName === "BUTTON") {
                            alert("Your answer was wrong! Try again after next 5 minutes");
                            alert(el[3]);
                            window.localStorage.setItem("condition", JSON.stringify(
                                condLocal.map((el2, i2) => i2 === i ? true : el2)
                            ));
                            window.location.reload();
                        }
                    }}>
                        <div style={{textDecorationLine: condLocal[i] ? "line-through" : ""}}>
                            {el[0]}
                            <button disabled={condLocal[i]}>{el[1][0]}</button>
                            <button disabled={condLocal[i]}>{el[1][1]}</button>
                            <button disabled={condLocal[i]}>{el[1][2]}</button>
                        </div>
                    </li>)}
                </ol>
            </div> : <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            }
        </div>
    )
}

export default SchoolProgram;

