import {Link} from "react-router-dom";

function Conundrums() {
    return (
        <div className="products-list profile conundrums">
            <div className="products-list__top">
                <div>
                    <h3>CHOOSE TYPE</h3>
                </div>
            </div>
            <div className="conundrums__main">
                <button>
                    <Link to="riddles">
                        Riddles
                    </Link>
                </button>
                <button>
                    <Link to="schoolPrg">
                        School program
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default Conundrums;