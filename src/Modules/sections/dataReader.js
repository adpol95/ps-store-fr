import {Link} from "react-router-dom";


const dataReader = (typeOfData) => {
    let arr = [];

    for (let titleOf in typeOfData) {
        arr.push([titleOf, typeOfData[titleOf]])
    }
    return arr.map((el, i) => {

        const mainId = i + 1;
        if (el[1].mainCover || el[1].Cover) {
            return <li key={mainId}>
                <Link to={mainId + ""} state={{dataAboutGame: el}}>
                    {el[0].includes('&#x27;') ? el[0].replace(/&#x27;/g, `'`) : el[0]}
                    <img src={el[1].mainCover || el[1].Cover} alt="" style={{width: "100px"}}/>
                </Link>
            </li>
        } else {
            let arr1 = [];
            const mainId2 = (mainId) * Math.floor((Math.random() * 100000) - 1);
            const mainCovers = Object.keys(el[1].allImgsAndTitles)[0];
            arr1.push(
                <li key={mainId2}>
                    <Link to={mainId2 + ""} state={{dataAboutGame: el}}>
                        {el[0]}
                        <img src={el[1].allImgsAndTitles[mainCovers][1]} alt="" style={{width: "100px"}}/>
                    </Link>
                </li>
            )
            return arr1;
        }
    })
}
export default dataReader;