import dataReader from "../dataReader";
import {useContext} from "react";
import DataContext from "../../context";

function Console() {
    const gamesData = useContext(DataContext);
    return (
        <div>
            <ul>
                {dataReader(gamesData.consoles)}
            </ul>
        </div>
    );
}

export default Console;