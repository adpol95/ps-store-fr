import {useEffect, useState} from "react";
import categoryLogo1 from "../assets/images/featured-01.png"
import categoryLogo2 from "../assets/images/featured-02.png"
import categoryLogo3 from "../assets/images/featured-03.png"
import categoryLogo4 from "../assets/images/featured-04.png"
import {Link} from "react-router-dom";

function Home() {
    const ranNum = Math.floor(Math.random() * 19) + 1;
    const [readyGames, setReadyGames] = useState([])
    const [dataIsReady, setDataIsReady] = useState(false);
    const [sizeWindow, setSizeWindow] = useState(window.innerWidth);
    window.addEventListener("resize", () => setSizeWindow(window.innerWidth));
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
                setReadyGames(resp);
                setDataIsReady(true);
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
                <div className="welcome-img" style={{display: sizeWindow > 810 ? "flex" : "none"}}>
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
            <div className="trending-games">
                <div className="trending-games__head-text">
                    <div className="top-name-description">
                        <h4>TRENDING</h4>
                        <h3>Most selling games</h3>
                    </div>
                    <div className="trending-games__head-text--right">
                        <Link to="" className="focus-btn category-btn__active">View all</Link>
                    </div>
                </div>
                <div className="trending-games__container">
                    {readyGames.slice(0, 8).map((el, i) => {
                        const readyTitle = el.title.includes('&#x27;') ? el.title.replace(/&#x27;/g, `'`) : el.title;
                        return <Link to={el["_id"]} state={{curTitle: readyTitle}} className="game-pack">
                            <div className="game-pack__top">
                                <img src={el.img} alt="" style={{objectFit: "cover", objectPosition: "0 25%"}}/>
                                <div className="game-pack__price">
                                    {el.Price}
                                </div>
                            </div>
                            <div className="game-pack__down">
                                <div className="game-pack__down--left">
                                    <h4 className="game-pack__down--genre">
                                        {el.Genre}
                                    </h4>
                                    <h4 className="game-pack__down--title">
                                        {readyTitle}
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
                        </Link>
                    })}
                </div>
            </div>
            <div className="bottom-section">
                <div className="bottom-section__block">
                    <div className="top-name-description">
                        <h4>Consoles</h4>
                        <h3><span>PLAY</span> LIKE NEVER BEFORE</h3>
                    </div>
                    <h4 className="bottom-section__description">
                        Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support
                        for haptic feedback, adaptive triggers and 3D Audio, and an all-new generation of incredible
                        PlayStation games.
                    </h4>
                    <button className="focus-btn category-btn__active">
                        Shop now
                    </button>
                </div>
                <div className="bottom-section__back-img" style={{display: sizeWindow > 810 ? "inline-block" : "none"}}>
                    <img
                        src="https://media.direct.playstation.com/is/image/sierialto/ps5-slim-minorsection-2?$Minor_Section_Desktop$"
                        alt="conoles-access-banner"/>
                </div>
                <div className="bottom-section__block">
                    <div className="top-name-description">
                        <h4>Accessories</h4>
                        <h3>Build your perfect gaming setup with <span>controllers, headsets
                            and other</span></h3>
                    </div>
                    <button className="focus-btn category-btn__active">
                        Shop now
                    </button>
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
