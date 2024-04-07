import {useEffect, useState} from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function Riddles() {
    const auth = useAuthUser();
    const [whichOne, setWhichOne] = useState("easy");
    const [refQuestions, setRefQuestions] = useState("");
    const [questions, setQuestions] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [dataIsReady, setDataIsReady] = useState(false);
    const [inputData, setInputData] = useState("");
    const signIn = useSignIn();
    const authHeader = useAuthHeader()
    const reward = {
        easy: 50,
        kids: 75,
        funny: 60,
        math: 100,
        word: 100,
        hard: 200
    }

    useEffect(() => {
        if (!questions.length) {
            fetch(process.env.REACT_APP_STATE1 + "/conundrums", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({type: "riddles"})
            })
                .then(r => r.json())
                .then(resp => {
                    setRefQuestions({
                        easy: resp[0].riddles.easy.filter(el => el[0]),
                        kids: resp[0].riddles.kids.filter(el => el[0]),
                        funny: resp[0].riddles.funny.filter(el => el[0]),
                        math: resp[0].riddles.math.filter(el => el[0]),
                        word: resp[0].riddles.word.filter(el => el[0]),
                        hard: resp[0].riddles.hard.filter(el => el[0])
                    });
                    setQuestions({
                        easy: resp[0].riddles.easy.filter((el, i) => el[0] && !auth.solved.riddles.easy.includes(i)),
                        kids: resp[0].riddles.kids.filter((el, i) => el[0] && !auth.solved.riddles.kids.includes(i)),
                        funny: resp[0].riddles.funny.filter((el, i) => el[0] && !auth.solved.riddles.funny.includes(i)),
                        math: resp[0].riddles.math.filter((el, i) => el[0] && !auth.solved.riddles.math.includes(i)),
                        word: resp[0].riddles.word.filter((el, i) => el[0] && !auth.solved.riddles.word.includes(i)),
                        hard: resp[0].riddles.hard.filter((el, i) => el[0] && !auth.solved.riddles.hard.includes(i))
                    });
                    setDataIsReady(true);
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [])
    return (
        <div className="products-list profile riddles">
            <div className="products-list__top">
                <div>
                    <h3>RIDDLES</h3>
                </div>
            </div>
            <div className="riddles__main">
                <div onClick={(event) => {
                    setWhichOne(event.target.innerText.toLowerCase());
                    setCurrentPage(0)
                }} className="riddles__main--type">
                    <button>Easy</button>
                    <button>Kids</button>
                    <button>Funny</button>
                    <button>Math</button>
                    <button>Word</button>
                    <button>Hard</button>
                </div>
                <div onClick={(event) => {
                    if (event.target.innerText === 'Previous riddle' && currentPage > 0) {
                        setCurrentPage(currentPage - 1)
                    } else if (event.target.innerText === 'Next riddle' && currentPage !== questions.length - 1) {
                        setCurrentPage(currentPage + 1)
                    }
                }} className={!dataIsReady ? "loader" : ""}>
                    {
                        dataIsReady ?
                            <div>
                                <div>
                                    <p>
                                        {questions[whichOne][currentPage][0]}
                                    </p>
                                    <div className="riddles__main--input">
                                        <input type="text" value={inputData}
                                               onChange={(event) => setInputData(event.target.value)}
                                               placeholder="Your answer"/>
                                        <button onClick={() => {
                                            if (inputData && questions[whichOne][currentPage][1].toLowerCase().includes(inputData.toLowerCase())) {
                                                fetch(process.env.REACT_APP_STATE1 + "/authorization/" + auth["_id"], {
                                                    method: "PATCH", // *GET, POST, PUT, DELETE, etc.
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        // 'Content-Type': 'application/x-www-form-urlencoded',
                                                    },
                                                    body: JSON.stringify({
                                                        wallet: auth.wallet + reward[whichOne],
                                                        solved: {
                                                            ...auth.solved,
                                                            riddles: {
                                                                ...auth.solved.riddles,
                                                                [whichOne]: auth.solved.riddles[whichOne] + refQuestions[whichOne].indexOf(questions[whichOne][currentPage])
                                                            }
                                                        }
                                                    })
                                                })
                                                    .then(() => {
                                                        signIn({
                                                            auth: {
                                                                token: authHeader.slice(7),
                                                                type: 'Bearer',
                                                            },
                                                            // refresh: response.refToken,
                                                            userState: {
                                                                ...auth,
                                                                wallet: auth.wallet + reward[whichOne],
                                                                solved: {
                                                                    ...auth.solved,
                                                                    riddles: {
                                                                        ...auth.solved.riddles,
                                                                        [whichOne]: auth.solved.riddles[whichOne] + refQuestions[whichOne].indexOf(questions[whichOne][currentPage])
                                                                    }
                                                                }
                                                            }
                                                        })
                                                        alert("Your are right! Congrats! You deserve " + reward[whichOne] + " points. \n Answer: " + questions[whichOne][currentPage][1]);
                                                        window.location.reload();
                                                    })
                                                    .catch(err => console.log(err))
                                            } else {
                                                alert("Your answer was wrong! Try again letter");
                                                setCurrentPage(currentPage + 1);
                                                setInputData("");
                                            }
                                        }}>Check
                                        </button>
                                    </div>
                                </div>
                                <div className="riddles__main--bottom">
                                    <button>
                                        Previous riddle
                                    </button>
                                    <b>{currentPage + 1 + " from " + questions[whichOne].length}</b>
                                    <button>
                                        Next riddle
                                    </button>
                                </div>
                            </div> :
                            <div className="lds-ring">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                    }
                </div>
                {

                    // whichOne ?
                    //     <ul>
                    //         {response[whichOne].filter(el2 => el2[0]).map(el => <li key={Math.random() * 100 - 1} >
                    //             {el[0]}
                    //         </li>)}
                    //     </ul> : ""
                }
            </div>
        </div>
    )
}

export default Riddles;