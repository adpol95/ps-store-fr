import {useEffect, useState} from "react";
import categoryLogo1 from "../assets/images/featured-01.png"
import categoryLogo2 from "../assets/images/featured-02.png"
import categoryLogo3 from "../assets/images/featured-03.png"
import categoryLogo4 from "../assets/images/featured-04.png"
import {Link} from "react-router-dom";

function Home() {
    const ranNum = Math.floor(Math.random() * 8) + 1;
    const [readyGames, setReadyGames] = useState([])
    const [dataIsReady, setDataIsReady] = useState(false);
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
                if (readyGames.length < 9) {
                    for (let c = 0; c < 9; c++) {
                        fetch(process.env.REACT_APP_STATE1 + "/newsAndProducts/page", {
                            method: "POST", // *GET, POST, PUT, DELETE, etc.
                            headers: {
                                "Content-Type": "application/json",
                                // 'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: JSON.stringify({type: "games", name: resp[c].title})
                        })
                            .then(r => r.json())
                            .then(resp => {
                                readyGames.push({
                                    title: resp[0].title,
                                    img: resp[0].img,
                                    Price: resp[0].Price,
                                    Genre: resp[0].Genre
                                })
                                if (readyGames.length === 9) setDataIsReady(true)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, []);
    if (dataIsReady) return (
        <div className="home">
            <div className="top-section">
                <div className="welcome-text">
                    <div className="welcome-text__greet">
                        WELCOME TO REBIRTH STORE
                    </div>
                    <div className='welcome-text__slogan'>
                        PUSH GAMES DROUGHT YOUR VEINS
                    </div>
                    <div className="welcome-text__description">
                        Enjoy hundreds of high-quality games, consoles, accessories and interactive network system in
                        our app.
                    </div>
                </div>
                <div className="welcome-img">
                    <div className="welcome-img__price">
                        {readyGames[ranNum].Price}
                    </div>
                    <img src={readyGames[ranNum].img} alt="top-img"/>
                </div>
                <div className="bottom-categories">
                    <div className="row-list__container">
                        <div className="bottom-categories__logo">
                            <img src={categoryLogo1} alt="cloud-sec"/>
                        </div>
                        <div>CLOUD STORAGE</div>
                    </div>
                    <div className="row-list__container">
                        <div className="bottom-categories__logo">
                            <img src={categoryLogo2} alt="user-sec"/>
                        </div>
                        <div>INTERACTIVE NETWORK</div>
                    </div>
                    <div className="row-list__container">
                        <div className="bottom-categories__logo">
                            <img src={categoryLogo3} alt="play-sec"/>
                        </div>
                        <div>EARN MONEY IN PLAY</div>
                    </div>
                    <div className="row-list__container">
                        <div className="bottom-categories__logo">
                            <img src={categoryLogo4} alt="filter-sec"/>
                        </div>
                        <div>BROWSE GAMES BY FILTER</div>
                    </div>
                </div>
            </div>
            <div className="middle-section">
                <div className="trending-games">
                    <div className="trending-games__head-text">
                        <div className="trending-games__head-text--left">
                            <h4>TRENDING</h4>
                            <h3>Most selling games</h3>
                        </div>
                        <div className="trending-games__head-text--right">
                            <Link to="" className="focus-btn category-btn__active">View all</Link>
                        </div>
                    </div>
                    <div className="trending-games__container">

                        <div className="trending-games__down-imgs">
                            <div className="game-pack">
                                <div className="game-pack__top">
                                    <img src={readyGames[0].img} alt=""/>
                                    <div className="game-pack__price">
                                        {readyGames[0].Price}
                                    </div>
                                </div>
                                <div className="game-pack__down">
                                    <div className="game-pack__down--left">
                                        <h4 className="game-pack__down--genre">
                                            {readyGames[0].Genre}
                                        </h4>
                                        <h4 className="game-pack__down--title">
                                            {readyGames[0].title}
                                        </h4>
                                    </div>
                                    <div className="game-pack__down--right">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24"
                                             fill="#F9F7F0">
                                            <path
                                                d="M5 22h14a2 2 0 0 0 2-2V9a1 1 0 0 0-1-1h-3v-.777c0-2.609-1.903-4.945-4.5-5.198A5.005 5.005 0 0 0 7 7v1H4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2zm12-12v2h-2v-2h2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-2 3h2v2H7v-2z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="game-pack">
                                <div className="game-pack__top">
                                    <img src={readyGames[1].img} alt=""/>
                                    <div className="game-pack__price">
                                        {readyGames[1].Price}
                                    </div>
                                </div>
                                <div className="game-pack__down">
                                    <div className="game-pack__down--left">
                                        <h4 className="game-pack__down--genre">
                                            {readyGames[1].Genre}
                                        </h4>
                                        <h4 className="game-pack__down--title">
                                            {readyGames[1].title}
                                        </h4>
                                    </div>
                                    <div className="game-pack__down--right">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24"
                                             fill="#F9F7F0">
                                            <path
                                                d="M5 22h14a2 2 0 0 0 2-2V9a1 1 0 0 0-1-1h-3v-.777c0-2.609-1.903-4.945-4.5-5.198A5.005 5.005 0 0 0 7 7v1H4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2zm12-12v2h-2v-2h2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-2 3h2v2H7v-2z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="game-pack">
                                <div className="game-pack__top">
                                    <img src={readyGames[2].img} alt=""/>
                                    <div className="game-pack__price">
                                        {readyGames[2].Price}
                                    </div>
                                </div>
                                <div className="game-pack__down">
                                    <div className="game-pack__down--left">
                                        <h4 className="game-pack__down--genre">
                                            {readyGames[2].Genre}
                                        </h4>
                                        <h4 className="game-pack__down--title">
                                            {readyGames[2].title}
                                        </h4>
                                    </div>
                                    <div className="game-pack__down--right">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24"
                                             fill="#F9F7F0">
                                            <path
                                                d="M5 22h14a2 2 0 0 0 2-2V9a1 1 0 0 0-1-1h-3v-.777c0-2.609-1.903-4.945-4.5-5.198A5.005 5.005 0 0 0 7 7v1H4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2zm12-12v2h-2v-2h2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-2 3h2v2H7v-2z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="game-pack">
                                <div className="game-pack__top">
                                    <img src={readyGames[3].img} alt=""/>
                                    <div className="game-pack__price">
                                        {readyGames[3].Price}
                                    </div>
                                </div>
                                <div className="game-pack__down">
                                    <div className="game-pack__down--left">
                                        <h4 className="game-pack__down--genre">
                                            {readyGames[3].Genre}
                                        </h4>
                                        <h4 className="game-pack__down--title">
                                            {readyGames[3].title}
                                        </h4>
                                    </div>
                                    <div className="game-pack__down--right">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24"
                                             fill="#F9F7F0">
                                            <path
                                                d="M5 22h14a2 2 0 0 0 2-2V9a1 1 0 0 0-1-1h-3v-.777c0-2.609-1.903-4.945-4.5-5.198A5.005 5.005 0 0 0 7 7v1H4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2zm12-12v2h-2v-2h2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-2 3h2v2H7v-2z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="trending-games__down-imgs">
                            <div className="game-pack">
                                <div className="game-pack__top">
                                    <img src={readyGames[4].img} alt=""/>
                                    <div className="game-pack__price">
                                        {readyGames[4].Price}
                                    </div>
                                </div>
                                <div className="game-pack__down">
                                    <div className="game-pack__down--left">
                                        <h4 className="game-pack__down--genre">
                                            {readyGames[4].Genre}
                                        </h4>
                                        <h4 className="game-pack__down--title">
                                            {readyGames[4].title}
                                        </h4>
                                    </div>
                                    <div className="game-pack__down--right">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24"
                                             fill="#F9F7F0">
                                            <path
                                                d="M5 22h14a2 2 0 0 0 2-2V9a1 1 0 0 0-1-1h-3v-.777c0-2.609-1.903-4.945-4.5-5.198A5.005 5.005 0 0 0 7 7v1H4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2zm12-12v2h-2v-2h2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-2 3h2v2H7v-2z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="game-pack">
                                <div className="game-pack__top">
                                    <img src={readyGames[5].img} alt=""/>
                                    <div className="game-pack__price">
                                        {readyGames[5].Price}
                                    </div>
                                </div>
                                <div className="game-pack__down">
                                    <div className="game-pack__down--left">
                                        <h4 className="game-pack__down--genre">
                                            {readyGames[5].Genre}
                                        </h4>
                                        <h4 className="game-pack__down--title">
                                            {readyGames[5].title}
                                        </h4>
                                    </div>
                                    <div className="game-pack__down--right">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24"
                                             fill="#F9F7F0">
                                            <path
                                                d="M5 22h14a2 2 0 0 0 2-2V9a1 1 0 0 0-1-1h-3v-.777c0-2.609-1.903-4.945-4.5-5.198A5.005 5.005 0 0 0 7 7v1H4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2zm12-12v2h-2v-2h2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-2 3h2v2H7v-2z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="game-pack">
                                <div className="game-pack__top">
                                    <img src={readyGames[6].img} alt=""/>
                                    <div className="game-pack__price">
                                        {readyGames[6].Price}
                                    </div>
                                </div>
                                <div className="game-pack__down">
                                    <div className="game-pack__down--left">
                                        <h4 className="game-pack__down--genre">
                                            {readyGames[6].Genre}
                                        </h4>
                                        <h4 className="game-pack__down--title">
                                            {readyGames[6].title}
                                        </h4>
                                    </div>
                                    <div className="game-pack__down--right">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24"
                                             fill="#F9F7F0">
                                            <path
                                                d="M5 22h14a2 2 0 0 0 2-2V9a1 1 0 0 0-1-1h-3v-.777c0-2.609-1.903-4.945-4.5-5.198A5.005 5.005 0 0 0 7 7v1H4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2zm12-12v2h-2v-2h2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-2 3h2v2H7v-2z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="game-pack">
                                <div className="game-pack__top">
                                    <img src={readyGames[7].img} alt=""/>
                                    <div className="game-pack__price">
                                        {readyGames[7].Price}
                                    </div>
                                </div>
                                <div className="game-pack__down">
                                    <div className="game-pack__down--left">
                                        <h4 className="game-pack__down--genre">
                                            {readyGames[7].Genre}
                                        </h4>
                                        <h4 className="game-pack__down--title">
                                            {readyGames[7].title}
                                        </h4>
                                    </div>
                                    <div className="game-pack__down--right">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24"
                                             fill="#F9F7F0">
                                            <path
                                                d="M5 22h14a2 2 0 0 0 2-2V9a1 1 0 0 0-1-1h-3v-.777c0-2.609-1.903-4.945-4.5-5.198A5.005 5.005 0 0 0 7 7v1H4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2zm12-12v2h-2v-2h2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-2 3h2v2H7v-2z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
    else return (
        <div className="loader">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>)
}

export default Home;
