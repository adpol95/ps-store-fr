import dataReader from "../dataReader";
import {useContext} from "react";
import DataContext from "../../context";

function Console() {
    const mainData = useContext(DataContext);
    return (
        <div>
            <ul>
                {dataReader(mainData.gData.consoles)}
            </ul>
        </div>
    );
}

export default Console;