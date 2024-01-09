import './App.css';
import Header from "./Modules/Header";
import Footer from "./Modules/Footer";
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import DataContext from "./Modules/context";

function App() {
    const [gamesData, setGamesData] = useState([]);
    useEffect(() => {
        fetch('https://psstorebackend-wsg33p63.b4a.run/products')
            .then((res) => res.json())
            .then((data) => {
                // setGamesData({...gamesData, ...data[0].games});
                setGamesData(data);
            })
    }, [])

    return (
        <div className="App">
            <DataContext.Provider value={gamesData}>
                <Header/>
                <Outlet/>
                <Footer/>
            </DataContext.Provider>
        </div>
    );
}

export default App;
