import {useContext} from "react";
import DataContext from "../../context";
import dataReader from "../dataReader";

function Accessories() {
    const mainData = useContext(DataContext);
    return (
        <div>
            <ul>
                {dataReader(mainData.gData.accessories)}
            </ul>
        </div>
    );
}

export default Accessories;