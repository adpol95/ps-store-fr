import {useEffect, useState} from "react";
import categoryLogo1 from "../assets/images/featured-01.png"
import categoryLogo2 from "../assets/images/featured-02.png"
import categoryLogo3 from "../assets/images/featured-03.png"
import categoryLogo4 from "../assets/images/featured-04.png"
function Home() {
    const [games, setGames] = useState("");
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
                setGames(resp);
                for (let c = 0; c < 5; c++) {
                    fetch(process.env.REACT_APP_STATE1 + "/newsAndProducts/page", {
                        method: "POST", // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            "Content-Type": "application/json",
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: JSON.stringify({type: "games", name: resp[Math.floor(Math.random() * 19) + 1].title})
                    })
                        .then(r => r.json())
                        .then(resp => {
                            const {title, img, Price} = resp[0];
                            setReadyGames([...readyGames, {title, img, Price}])
                            if (c === 4) setDataIsReady(true)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, []);
    if (dataIsReady) return (
        <div className="home">
            <div className="home__top-section">
                <div className="home__welcome-text">
                    <div className="home__welcome-text--greet">
                        WELCOME TO REBIRTH STORE
                    </div>
                    <div className='home__welcome-text--slogan'>
                        PUSH GAMES DROUGHT YOUR VEINS
                    </div>
                    <div className="home__welcome-text--description">
                        Enjoy hundreds of high-quality games, consoles, accessories and interactive network system in
                        our app.
                    </div>
                </div>
                <div className="home__welcome-img">
                    <div className="home__welcome-img--price">
                        {readyGames[readyGames.length - 1].Price}
                    </div>
                    <img src={readyGames[readyGames.length - 1].img} alt="top-img"/>
                </div>
                <div className="home__bottom-categories">
                    <div>
                        <img src={categoryLogo1} alt="cloud-sec"/>
                        <p>CLOUD STORAGE</p>
                    </div>
                    <div>
                        <img src={categoryLogo2} alt="user-sec"/>
                        <p>INTERACTIVE NETWORK</p>
                    </div>
                    <div>
                        <img src={categoryLogo3} alt="play-sec"/>
                        <p>EARN MONEY IN PLAY</p>
                    </div>
                    <div>
                        <img src={categoryLogo4} alt="filter-sec"/>
                        <p>BROWSE GAMES BY FILTER</p>
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
