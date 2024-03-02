import {Link} from "react-router-dom";

function Conundrums() {
    return (
        <div>
            <div>
                <h3>
                    <Link to="riddles">
                        Riddles
                    </Link>
                </h3>
            </div>
            <div>
                <h3>
                    <Link to="schoolPrg">
                        School program
                    </Link>
                </h3>
            </div>
        </div>
    )
}

export default Conundrums;