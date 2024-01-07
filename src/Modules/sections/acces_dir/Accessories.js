import {useContext} from "react";
import DataContext from "../../context";
import dataReader from "../dataReader";

function Accessories() {
    const gamesData = useContext(DataContext);
    return (
        <div>
            <ul>
                {dataReader(gamesData.accessories)}
            </ul>
        </div>
    );
}

export default Accessories;