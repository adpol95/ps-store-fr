import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Registration() {

    const navigate = useNavigate();
    const [input, setInput] = useState({
        userName: "",
        password: "",
        country: "",
        avatar: "",
        birthDay: ""
    });

    const submiter = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/authorization", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        }).then((res) => {
            console.log(res);
            navigate("/");
            alert("Congratulations!");
        }).catch((err) => alert(err));
    }

    return (
        <div>
            <h2>Type about yourself</h2>
            <form onSubmit={submiter}>
                <div onChange={(event) => setInput({
                    ...input,
                    [event.target.title]: event.target.title === "birthDay" ? input.birthDay + event.target.value + " " : event.target.value
                })}>
                    <div>
                        <label htmlFor="Country/Region-select">Country/Region</label>
                        <select title="country">
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
                    </div>
                    <div>
                        <div>

                            Make sure you enter your date of birth correctly. It may be necessary later for security
                            purposes. Other players won't be able to see it.
                        </div>
                        <select title="birthDay" name="day" id="day-select">
                            <option value="" id="day__prompt-text">Day</option>
                            <option value="1" id="day__1">1</option>
                            <option value="2" id="day__2">2</option>
                            <option value="3" id="day__3">3</option>
                            <option value="4" id="day__4">4</option>
                            <option value="5" id="day__5">5</option>
                            <option value="6" id="day__6">6</option>
                            <option value="7" id="day__7">7</option>
                            <option value="8" id="day__8">8</option>
                            <option value="9" id="day__9">9</option>
                            <option value="10" id="day__10">10</option>
                            <option value="11" id="day__11">11</option>
                            <option value="12" id="day__12">12</option>
                            <option value="13" id="day__13">13</option>
                            <option value="14" id="day__14">14</option>
                            <option value="15" id="day__15">15</option>
                            <option value="16" id="day__16">16</option>
                            <option value="17" id="day__17">17</option>
                            <option value="18" id="day__18">18</option>
                            <option value="19" id="day__19">19</option>
                            <option value="20" id="day__20">20</option>
                            <option value="21" id="day__21">21</option>
                            <option value="22" id="day__22">22</option>
                            <option value="23" id="day__23">23</option>
                            <option value="24" id="day__24">24</option>
                            <option value="25" id="day__25">25</option>
                            <option value="26" id="day__26">26</option>
                            <option value="27" id="day__27">27</option>
                            <option value="28" id="day__28">28</option>
                            <option value="29" id="day__29">29</option>
                            <option value="30" id="day__30">30</option>
                            <option value="31" id="day__31">31</option>
                        </select>
                        <select title="birthDay" name="month" id="month-select">
                            <option value="" id="month__prompt-text">Month</option>
                            <option value="1" id="month__1">1</option>
                            <option value="2" id="month__2">2</option>
                            <option value="3" id="month__3">3</option>
                            <option value="4" id="month__4">4</option>
                            <option value="5" id="month__5">5</option>
                            <option value="6" id="month__6">6</option>
                            <option value="7" id="month__7">7</option>
                            <option value="8" id="month__8">8</option>
                            <option value="9" id="month__9">9</option>
                            <option value="10" id="month__10">10</option>
                            <option value="11" id="month__11">11</option>
                            <option value="12" id="month__12">12</option>
                        </select>
                        <select title="birthDay" name="year" id="year-select">
                            <option value="" id="year__prompt-text">Year</option>
                            <option value="2024" id="year__2024">2024</option>
                            <option value="2023" id="year__2023">2023</option>
                            <option value="2022" id="year__2022">2022</option>
                            <option value="2021" id="year__2021">2021</option>
                            <option value="2020" id="year__2020">2020</option>
                            <option value="2019" id="year__2019">2019</option>
                            <option value="2018" id="year__2018">2018</option>
                            <option value="2017" id="year__2017">2017</option>
                            <option value="2016" id="year__2016">2016</option>
                            <option value="2015" id="year__2015">2015</option>
                            <option value="2014" id="year__2014">2014</option>
                            <option value="2013" id="year__2013">2013</option>
                            <option value="2012" id="year__2012">2012</option>
                            <option value="2011" id="year__2011">2011</option>
                            <option value="2010" id="year__2010">2010</option>
                            <option value="2009" id="year__2009">2009</option>
                            <option value="2008" id="year__2008">2008</option>
                            <option value="2007" id="year__2007">2007</option>
                            <option value="2006" id="year__2006">2006</option>
                            <option value="2005" id="year__2005">2005</option>
                            <option value="2004" id="year__2004">2004</option>
                            <option value="2003" id="year__2003">2003</option>
                            <option value="2002" id="year__2002">2002</option>
                            <option value="2001" id="year__2001">2001</option>
                            <option value="2000" id="year__2000">2000</option>
                            <option value="1999" id="year__1999">1999</option>
                            <option value="1998" id="year__1998">1998</option>
                            <option value="1997" id="year__1997">1997</option>
                            <option value="1996" id="year__1996">1996</option>
                            <option value="1995" id="year__1995">1995</option>
                            <option value="1994" id="year__1994">1994</option>
                            <option value="1993" id="year__1993">1993</option>
                            <option value="1992" id="year__1992">1992</option>
                            <option value="1991" id="year__1991">1991</option>
                            <option value="1990" id="year__1990">1990</option>
                            <option value="1989" id="year__1989">1989</option>
                            <option value="1988" id="year__1988">1988</option>
                            <option value="1987" id="year__1987">1987</option>
                            <option value="1986" id="year__1986">1986</option>
                            <option value="1985" id="year__1985">1985</option>
                            <option value="1984" id="year__1984">1984</option>
                            <option value="1983" id="year__1983">1983</option>
                            <option value="1982" id="year__1982">1982</option>
                            <option value="1981" id="year__1981">1981</option>
                            <option value="1980" id="year__1980">1980</option>
                            <option value="1979" id="year__1979">1979</option>
                            <option value="1978" id="year__1978">1978</option>
                            <option value="1977" id="year__1977">1977</option>
                            <option value="1976" id="year__1976">1976</option>
                            <option value="1975" id="year__1975">1975</option>
                            <option value="1974" id="year__1974">1974</option>
                            <option value="1973" id="year__1973">1973</option>
                            <option value="1972" id="year__1972">1972</option>
                            <option value="1971" id="year__1971">1971</option>
                            <option value="1970" id="year__1970">1970</option>
                            <option value="1969" id="year__1969">1969</option>
                            <option value="1968" id="year__1968">1968</option>
                            <option value="1967" id="year__1967">1967</option>
                            <option value="1966" id="year__1966">1966</option>
                            <option value="1965" id="year__1965">1965</option>
                            <option value="1964" id="year__1964">1964</option>
                            <option value="1963" id="year__1963">1963</option>
                            <option value="1962" id="year__1962">1962</option>
                            <option value="1961" id="year__1961">1961</option>
                            <option value="1960" id="year__1960">1960</option>
                            <option value="1959" id="year__1959">1959</option>
                            <option value="1958" id="year__1958">1958</option>
                            <option value="1957" id="year__1957">1957</option>
                            <option value="1956" id="year__1956">1956</option>
                            <option value="1955" id="year__1955">1955</option>
                            <option value="1954" id="year__1954">1954</option>
                            <option value="1953" id="year__1953">1953</option>
                            <option value="1952" id="year__1952">1952</option>
                            <option value="1951" id="year__1951">1951</option>
                            <option value="1950" id="year__1950">1950</option>
                            <option value="1949" id="year__1949">1949</option>
                            <option value="1948" id="year__1948">1948</option>
                            <option value="1947" id="year__1947">1947</option>
                            <option value="1946" id="year__1946">1946</option>
                            <option value="1945" id="year__1945">1945</option>
                            <option value="1944" id="year__1944">1944</option>
                            <option value="1943" id="year__1943">1943</option>
                            <option value="1942" id="year__1942">1942</option>
                            <option value="1941" id="year__1941">1941</option>
                            <option value="1940" id="year__1940">1940</option>
                            <option value="1939" id="year__1939">1939</option>
                            <option value="1938" id="year__1938">1938</option>
                            <option value="1937" id="year__1937">1937</option>
                            <option value="1936" id="year__1936">1936</option>
                            <option value="1935" id="year__1935">1935</option>
                            <option value="1934" id="year__1934">1934</option>
                            <option value="1933" id="year__1933">1933</option>
                            <option value="1932" id="year__1932">1932</option>
                            <option value="1931" id="year__1931">1931</option>
                            <option value="1930" id="year__1930">1930</option>
                            <option value="1929" id="year__1929">1929</option>
                            <option value="1928" id="year__1928">1928</option>
                            <option value="1927" id="year__1927">1927</option>
                            <option value="1926" id="year__1926">1926</option>
                            <option value="1925" id="year__1925">1925</option>
                            <option value="1924" id="year__1924">1924</option>
                            <option value="1923" id="year__1923">1923</option>
                            <option value="1922" id="year__1922">1922</option>
                            <option value="1921" id="year__1921">1921</option>
                            <option value="1920" id="year__1920">1920</option>
                            <option value="1919" id="year__1919">1919</option>
                            <option value="1918" id="year__1918">1918</option>
                            <option value="1917" id="year__1917">1917</option>
                            <option value="1916" id="year__1916">1916</option>
                            <option value="1915" id="year__1915">1915</option>
                            <option value="1914" id="year__1914">1914</option>
                            <option value="1913" id="year__1913">1913</option>
                            <option value="1912" id="year__1912">1912</option>
                            <option value="1911" id="year__1911">1911</option>
                            <option value="1910" id="year__1910">1910</option>
                            <option value="1909" id="year__1909">1909</option>
                            <option value="1908" id="year__1908">1908</option>
                            <option value="1907" id="year__1907">1907</option>
                            <option value="1906" id="year__1906">1906</option>
                            <option value="1905" id="year__1905">1905</option>
                            <option value="1904" id="year__1904">1904</option>
                            <option value="1903" id="year__1903">1903</option>
                            <option value="1902" id="year__1902">1902</option>
                            <option value="1901" id="year__1901">1901</option>
                            <option value="1900" id="year__1900">1900</option>
                        </select>
                    </div>
                    <div>
                        <div>Your nickname</div>
                        <input type="text" title="userName"/>
                        <div>Create your password</div>
                        <input type="text" title="password"/>
                    </div>
                    <div onClick={(event) => setInput({...input, avatar: event.target.src})}>
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
                </div>
                <button type="submit"> Create profile</button>
            </form>
        </div>
    )
}

export default Registration;
