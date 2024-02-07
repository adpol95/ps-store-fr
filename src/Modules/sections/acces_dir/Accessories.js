import {useContext} from "react";
import DataContext from "../tools_dir/context";
import dataReader from "../tools_dir/dataReader";

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