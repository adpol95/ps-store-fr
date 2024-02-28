import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

function AccessoriesPage() {
    const {state} = useLocation();
    const auth = useAuthUser();
    const isAuth = useIsAuthenticated();
    const nameTitle = state.curTitle
    const [cartIsReady, setCartIsReady] = useState(isAuth() ? !auth.cart.some(el => el.title === nameTitle) : !JSON.parse(localStorage.getItem(nameTitle)));
    const [addToCart, setAddToCart] = useState(false);

    const [datas, setDatas] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [currentColor, setCurrentColor] = useState(nameTitle.includes("NVMe") ?
        "1TB" : nameTitle.includes("DUALSHOCK") ? "Jet Black" : nameTitle.includes("Covers") ?
            "Midnight Black" : nameTitle.includes("Wireless")
                ? "White" : false);
    const [currentImgs, setCurrentImgs] = useState("");
    const [stateColors, setStateColors] = useState("");
    const [inBox, setInBox] = useState("");
    const [dataIsReady, setDataIsReady] = useState(false);
    const isHaveColor = currentColor ? nameTitle + " " + "-" + " " + currentColor : nameTitle
    const isYouHaveIt = auth.ownership.accessories.some(el => el.name === isHaveColor);
    useEffect(() => {
        fetch(process.env.REACT_APP_STATE1 + "/newsAndProducts/page", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({type: "accessories", name: nameTitle})
        })
            .then(r => r.json())
            .then(resp => {
                setDatas(resp);
                if (currentColor) {
                    setStateColors(<ul
                        style={{display: "grid", gridTemplateColumns: "85px 85px 85px", columnGap: "5px"}}>
                        {Object.keys(resp.allImgsAndTitles).map((el, i) => <li key={i * 23}
                                                                                        style={{listStyleType: "none"}}>
                            <img src={resp.allImgsAndTitles[el][nameTitle.includes("SSD") ? 3 : 0]} alt={el}
                                 style={{
                                     objectFit: "none",
                                     width: "100%",
                                     objectPosition: nameTitle.includes("Covers") ? "63% 10%" : nameTitle.includes("DUALSHOCK") ? "12% 65%" : nameTitle.includes("SSD") ? "27% 44%" : "50% 27%"
                                 }}
                            />
                        </li>)}
                    </ul>)
                    setCurrentImgs(resp.allImgsAndTitles[currentColor])
                } else {
                    setCurrentImgs(resp.descriptionImgs)
                    setInBox(<div>
                        <h3>What in the box</h3>
                        <ul>
                            {resp.whatInTheBox.map((el, i) => <li key={i * 12}>
                                {el}
                            </li>)}
                        </ul>
                    </div>)
                }
                setDataIsReady(true);
            })
            .catch(err => {
                console.log(err)
            })

    }, [])
    useEffect(() => {
        if (datas && currentColor) setCurrentImgs(datas.allImgsAndTitles[currentColor])
    }, [currentColor]);
    useEffect(() => {
        if (addToCart) {
            if (isAuth()) {
                fetch(process.env.REACT_APP_STATE1 + "/authorization/" + auth["_id"], {
                    method: "PATCH", // *GET, POST, PUT, DELETE, etc.
                    mode: "cors", // no-cors, *cors, same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, *same-origin, omit
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect: "follow", // manual, *follow, error
                    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify({
                        cart: [
                            ...auth.cart,
                            {
                                title: isHaveColor,
                                img: currentColor ? datas.allImgsAndTitles[currentColor][0] : datas.img,
                                amount: 1,
                                _id: datas["_id"],
                                type: "Accessories",
                                Age: undefined,
                                Price: datas.price
                            }
                        ]
                    })
                })
                    .then(res => {
                        document.cookie = "_auth_state=" + JSON.stringify({
                            ...auth,
                            cart: [
                                ...auth.cart,
                                {
                                    title: isHaveColor,
                                    img: currentColor ? datas.allImgsAndTitles[currentColor][0] : datas.img,
                                    amount: 1,
                                    _id: datas["_id"],
                                    type: "Accessories",
                                    Age: undefined,
                                    Price: datas.price
                                }
                            ]
                        }) + ";path=/"
                        alert("Accessor is added in basket")
                        console.log(res)
                        // navigate("/psn");
                        window.location.reload();
                    })
                    .catch(err => console.log(err))
            }
            else {
                window.localStorage.setItem(nameTitle, JSON.stringify({
                    title: isHaveColor,
                    img: currentColor ? datas.allImgsAndTitles[currentColor][0] : datas.img,
                    amount: 1,
                    _id: datas["_id"],
                    type: "Accessories",
                    Age: undefined,
                    Price: datas.price
                }));
                window.location.reload();
            }
        }
    }, [addToCart]);
    return (
        <div onClick={(event) => {
            if (event.target.innerText === '<' && currentPage > 0) {
                setCurrentPage(currentPage - 1)
            } else if (event.target.innerText === '>' && currentPage !== currentImgs.length - 1) {
                setCurrentPage(currentPage + 1)
            }
        }} className={!dataIsReady ? "loader" : ""}>
            {dataIsReady ?
                <div>
                    <h1>
                        {isHaveColor}
                    </h1>
                    <button>
                        &lt;
                    </button>
                    <img src={currentImgs[currentPage]} alt="" style={{width: "300px"}}/>
                    <button>
                        &gt;
                    </button>
                    <div onClick={(event) => {
                        if (event.target.localName === "img") {
                            setCurrentColor(event.target.alt);
                        }
                    }}>
                        {currentColor ? <div> Color: {currentColor}
                        </div> : ""}
                        {stateColors}
                    </div>
                    <div>Realise date: {datas.realiseDate}</div>
                    <div>Price: {datas.price}</div>
                    <div>
                        {cartIsReady ? <button onClick={() => setAddToCart(true)} disabled={isYouHaveIt}>{isYouHaveIt ? "You already have this product" : "Add to Cart"}</button> :
                            <Link to="/basket">
                                <button>To Cart</button>
                            </Link>}
                    </div>
                    <div>{datas.previewText}</div>
                    <hr/>
                    <div>
                        <h3>Tearms</h3>
                        <ul>
                            {datas.terms.map((el, i) => <li key={i * 14}>
                                {el}
                            </li>)}
                        </ul>
                    </div>
                    <hr/>
                    <div>
                        <ul>
                            {datas.mainText.map((el, i) => <li key={i * 114}>
                                    <img src={currentImgs[i + 1]} alt="accessories img error"/>
                                    <h3>
                                        {el.title}
                                    </h3>
                                    <ul>
                                        {el.descript.map((el, il) => <li key={il * 221}>{el}</li>)}
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>
                    <hr/>
                    {inBox}
                </div> :
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
        </div>
    )

}

export default AccessoriesPage;