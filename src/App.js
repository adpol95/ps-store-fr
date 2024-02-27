import './App.css';
import Header from "./Modules/Header";
import Footer from "./Modules/Footer";
import {Outlet} from "react-router-dom";



function App() {
       return (
        <div className="App">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
}

export default App;
