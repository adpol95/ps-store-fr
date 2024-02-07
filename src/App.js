import './App.css';
import Header from "./Modules/Header";
import Footer from "./Modules/Footer";
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import DataContext from "./Modules/sections/tools_dir/context";


function App() {
    const [gamesData, setGamesData] = useState([]);
    const [newsData, setNewsData] = useState([]);
    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then((res) => res.json())
    //         .then((data) => {
    //             // setGamesData({...gamesData, ...data[0].games});
    //             console.log("ready")
    //             setGamesData(data);
    //         })
    //     fetch('http://localhost:5000/news')
    //         .then((resp) => resp.json())
    //         .then((datasa) => {
    //             // setGamesData({...gamesData, ...data[0].games});
    //             console.log("ready2")
    //             setNewsData(datasa);
    //         })
    // }, [])

    return (
        <div className="App">
            <DataContext.Provider value={{gData: gamesData, nData: newsData}}>
                <Header/>
                <Outlet/>
                <Footer/>
            </DataContext.Provider>

        </div>
    );
}

export default App;
