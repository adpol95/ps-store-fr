import dataReader from "../tools_dir/dataReader";
import {useContext} from "react";
import DataContext from "../tools_dir/context";

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