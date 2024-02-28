import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function AcSettings() {
    const auth = useAuthUser();
    const signOut = useSignOut();
    const navigate = useNavigate();
    const [editDisplayState, setEditDisplayState] = useState({state: false, target: ""});
    const [changeInput, setChangeInput] = useState("");
    const submiter = (event) => {
        event.preventDefault();
        if (event.target.innerText === "Delete account") {
            fetch("https://psstorebackend-wsg33p63.b4a.run/authorization/" + auth["_id"], {
                method: "DELETE", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            })
                .then(res => {
                    console.log(res);
                    signOut();
                    navigate("/");
                    window.location.reload();
                    alert("Your account has been deleted");
                })
                .catch(err => {
                    console.log(err)
                    alert("Something goes wrong. Try again later")
                })
        } else {
            fetch("https://psstorebackend-wsg33p63.b4a.run/authorization/" + auth["_id"], {
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
                body: JSON.stringify({[editDisplayState.target === "Nickname" ? "userName" : editDisplayState.target === "Profile Picture" ? "avatar" : editDisplayState.target.toLowerCase()]: changeInput})
            })
                .then(res => {
                    signOut();
                    navigate("/");
                    window.location.reload();
                    alert("Your account has been chanced");
                    console.log(res)
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div>
            <h3>Your information</h3>
            <ul onClick={(event) => {
                if (event.target.innerText === "Edit") setEditDisplayState({
                    state: true,
                    target: event.target.parentElement.firstChild.innerText
                })
            }}>
                <li>
                    <div>
                        Nickname
                    </div>
                    <div>
                        {auth.userName}
                    </div>
                    <button>
                        Edit
                    </button>
                </li>
                <li>
                    <div>
                        Country
                    </div>
                    <div>
                        {auth.country}
                    </div>
                    <button>
                        Edit
                    </button>
                </li>
                <li>
                    <div>
                        Birthday
                    </div>
                    <div>
                        {auth.birthDay}
                    </div>
                    <button>
                        Edit
                    </button>
                </li>
                <li>
                    <div>
                        Profile Picture
                    </div>
                    <div>
                        <img src={auth.avatar} alt="avatar-error"/>
                    </div>
                    <button>
                        Edit
                    </button>
                </li>
                <li>
                    <div>
                        Password
                    </div>
                    <div>
                        {auth.password.replace(/./gi, "*")}
                    </div>
                    <button>
                        Edit
                    </button>
                </li>
                <form onSubmit={submiter}>
                    <li>
                        <button type="submit"><b>Delete account</b></button>
                    </li>
                </form>
            </ul>
            {
                editDisplayState.state ? <div>
                    <div onClick={() => setEditDisplayState({...editDisplayState, state: false})}>X</div>
                    <h3>Change your {editDisplayState.target}</h3>
                    <form onSubmit={submiter} onChange={(event) => {
                        return setChangeInput(event.target.value)
                    }}>
                        { editDisplayState.target === "Profile Picture" ?
                            <div  onClick={(event) => setChangeInput(event.target.src)}>
                                <div>Choose your avatar</div>
                                <img
                                    src="https://image.api.playstation.com/cdn/UP1018/CUSA00133_00/XlkEcZSBzuJPIJo8BI7l0KuY0hBYrO8c.png?w=440&thumb=false"
                                    alt="" title="avatar"/>
                                <img
                                    src="https://image.api.playstation.com/cdn/UP1018/CUSA00133_00/6eTP4WXtViqk8T0NIBjBrVwAxm3U2JQS.png?w=440&thumb=false"
                                    alt="" title="avatar"/>
                                <img
                                    src="https://image.api.playstation.com/cdn/UP0151/CUSA09971_00/FEs8B2BDAudxV3js6SM2t4vZ88vnxSi0.png?w=440&thumb=false"
                                    alt="" title="avatar"/>
                                <img
                                    src="https://image.api.playstation.com/cdn/UP4497/CUSA00527_00/EcOWnY3ulhHtxTOVRV14jbPjwflUQ4Mr.png?w=440&thumb=false"
                                    alt="" title="avatar"/>
                                <img
                                    src="https://image.api.playstation.com/cdn/UP1018/CUSA00133_00/ST5jC9mZSY0yjVkc1mL8RcNRTPxSfA1H.png?w=440&thumb=false"
                                    alt="" title="avatar"/>
                                <img
                                    src="https://image.api.playstation.com/cdn/UP2719/CUSA06152_00/0tf7muX8S4hgHD8l9GHE3NNmGvBpzRWU.png?w=440&thumb=false"
                                    alt="" title="avatar"/>
                                <img
                                    src="https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/vrBGaVVgpY2pFetQAjauhla5mchYNosT.png?w=440&thumb=false"
                                    alt="" title="avatar"/>
                                <img
                                    src="https://image.api.playstation.com/cdn/UP0001/CUSA04459_00/axTqMXvInz119015LgZO4ciQnGGGkJnv.png?w=440&thumb=false"
                                    alt="" title="avatar"/>
                                <img
                                    src="https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/wQYnx73VVaaHKanoA4EI44j6KxwO4eAj.png?w=440&thumb=false"
                                    alt="" title="avatar"/>
                                <img
                                    src="https://image.api.playstation.com/cdn/UP0001/CUSA04459_00/LzLAQ7BLLNXEBFFHYhGhnalUfJkdVooV.png?w=440&thumb=false"
                                    alt="" title="avatar"/>
                                <img
                                    src="https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/RRKe40N3KzlGpPaLK8zl6pl3QdK8Rwqw.png?w=440&thumb=false"
                                    alt="" title="avatar"/>
                                <img
                                    src="https://image.api.playstation.com/cdn/UP1018/CUSA00133_00/j6zdnNELgfKqeI2XhuKkRuMxGJPiBsmg.png?w=440&thumb=false"
                                    alt="" title="avatar"/>
                                <img
                                    src="https://image.api.playstation.com/cdn/UP4497/CUSA00527_00/39sZiJDryiW9jCc6FrXvSM5Qb1utkr8C.png?w=440&thumb=false"
                                    alt="" title="avatar"/>
                                <img
                                    src="https://image.api.playstation.com/cdn/UP9000/CUSA07820_00/NAoBeXb9Oidhc63TZlaLjatQ53XiJ0q0.png?w=440&thumb=false"
                                    alt="" title="avatar"/>
                                <img
                                    src="https://image.api.playstation.com/cdn/UP1477/CUSA07022_00/tymPJQOSSD50hoEvo5Jib3SxPMSgeTD9.png?w=440&thumb=false"
                                    alt="" title="avatar"/>
                                <img
                                    src="https://image.api.playstation.com/cdn/UP1477/CUSA07022_00/PkJtF0kuB89EXe1TbbfWSFHV1N3dQGoM.png?w=440&thumb=false"
                                    alt="" title="avatar"/>
                            </div>
                            : editDisplayState.target === "Country" ?
                                <div>
                                    <label htmlFor="">Country/Region</label>
                                    <select title="coury">
                                        <option id="country__AR">
                                            Argentina
                                        </option>
                                        <option id="country__AU">
                                            Australia
                                        </option>
                                        <option id="country__AT">
                                            Austria
                                        </option>
                                        <option id="country__BH">
                                            Bahrain
                                        </option>
                                        <option id="country__BE">
                                            Belgium
                                        </option>
                                        <option id="country__BO">
                                            Bolivia, Plurinational State of
                                        </option>
                                        <option id="country__BR">
                                            Brazil
                                        </option>
                                        <option id="country__BG">
                                            Bulgaria
                                        </option>
                                        <option id="country__CA">
                                            Canada
                                        </option>
                                        <option id="country__CL">
                                            Chile
                                        </option>
                                        <option id="country__CO">
                                            Colombia
                                        </option>
                                        <option id="country__CR">
                                            Costa Rica
                                        </option>
                                        <option id="country__HR">
                                            Croatia
                                        </option>
                                        <option id="country__CY">
                                            Cyprus
                                        </option>
                                        <option id="country__CZ">
                                            Czech Republic
                                        </option>
                                        <option id="country__DK">
                                            Denmark
                                        </option>
                                        <option id="country__EC">
                                            Ecuador
                                        </option>
                                        <option id="country__SV">
                                            El Salvador
                                        </option>
                                        <option id="country__FI">
                                            Finland
                                        </option>
                                        <option id="country__FR">
                                            France
                                        </option>
                                        <option id="country__DE">
                                            Germany
                                        </option>
                                        <option id="country__GR">
                                            Greece
                                        </option>
                                        <option id="country__GT">
                                            Guatemala
                                        </option>
                                        <option id="country__HN">
                                            Honduras
                                        </option>
                                        <option id="country__HK">
                                            Hong Kong
                                        </option>
                                        <option id="country__HU">
                                            Hungary
                                        </option>
                                        <option id="country__IS">
                                            Iceland
                                        </option>
                                        <option id="country__IN">
                                            India
                                        </option>
                                        <option id="country__ID">
                                            Indonesia
                                        </option>
                                        <option id="country__IE">
                                            Ireland
                                        </option>
                                        <option id="country__IL">
                                            Israel
                                        </option>
                                        <option id="country__IT">
                                            Italy
                                        </option>
                                        <option id="country__JP">
                                            Japan
                                        </option>
                                        <option id="country__KR">
                                            Korea
                                        </option>
                                        <option id="country__KW">
                                            Kuwait
                                        </option>
                                        <option id="country__LB">
                                            Lebanon
                                        </option>
                                        <option id="country__LU">
                                            Luxembourg
                                        </option>
                                        <option id="country__CN">
                                            Mainland China
                                        </option>
                                        <option id="country__MY">
                                            Malaysia
                                        </option>
                                        <option id="country__MT">
                                            Malta
                                        </option>
                                        <option id="country__MX">
                                            Mexico
                                        </option>
                                        <option id="country__NL">
                                            Netherlands
                                        </option>
                                        <option id="country__NZ">
                                            New Zealand
                                        </option>
                                        <option id="country__NI">
                                            Nicaragua
                                        </option>
                                        <option id="country__NO">
                                            Norway
                                        </option>
                                        <option id="country__OM">
                                            Oman
                                        </option>
                                        <option id="country__PA">
                                            Panama
                                        </option>
                                        <option id="country__PY">
                                            Paraguay
                                        </option>
                                        <option id="country__PE">
                                            Peru
                                        </option>
                                        <option id="country__PL">
                                            Poland
                                        </option>
                                        <option id="country__PT">
                                            Portugal
                                        </option>
                                        <option id="country__QA">
                                            Qatar
                                        </option>
                                        <option id="country__RO">
                                            Romania
                                        </option>
                                        <option id="country__RU">
                                            Russia
                                        </option>
                                        <option id="country__SA">
                                            Saudi Arabia
                                        </option>
                                        <option id="country__SG">
                                            Singapore
                                        </option>
                                        <option id="country__SK">
                                            Slovakia
                                        </option>
                                        <option id="country__SI">
                                            Slovenia
                                        </option>
                                        <option id="country__ZA">
                                            South Africa
                                        </option>
                                        <option id="country__ES">
                                            Spain
                                        </option>
                                        <option id="country__SE">
                                            Sweden
                                        </option>
                                        <option id="country__CH">
                                            Switzerland
                                        </option>
                                        <option id="country__TW">
                                            Taiwan
                                        </option>
                                        <option id="country__TH">
                                            Thailand
                                        </option>
                                        <option id="country__TR">
                                            Turkey
                                        </option>
                                        <option id="country__UA">
                                            Ukraine
                                        </option>
                                        <option id="country__AE">
                                            United Arab Emirates
                                        </option>
                                        <option id="country__GB">
                                            United Kingdom
                                        </option>
                                        <option id="country__US">
                                            United States
                                        </option>
                                        <option id="country__UY">
                                            Uruguay
                                        </option>
                                    </select>
                                </div> :
                                <input value={changeInput} />
                        }
                        <button type="submit">Change</button>
                    </form>
                </div> : ""
            }
        </div>
    )
}

export default AcSettings;
