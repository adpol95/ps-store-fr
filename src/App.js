import './App.css';
import Header from "./Modules/Header";
import Footer from "./Modules/Footer";
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import DataContext from "./Modules/sections/tools_dir/context";


function App() {
    const [gamesData, setGamesData] = useState([]);
    const [newsData, setNewsData] = useState([]);
    const [dataIsReady, setDataIsReady] = useState(false);
    useEffect(() => {
        fetch(process.env.REACT_APP_STATE1 + '/products')
            .then((res) => res.json())
            .then((data) => {
                // setGamesData({...gamesData, ...data[0].games});
                setDataIsReady(true)
                setGamesData(data);
            })
        fetch(process.env.REACT_APP_STATE1 + '/news')
            .then((resp) => resp.json())
            .then((datasa) => {
                // setGamesData({...gamesData, ...data[0].games});
                console.log(2)
                setNewsData(datasa);
            })
    }, [])

    return (
        <div className="App" style={!dataIsReady ? {height: "800px"} : {}}>
            {dataIsReady ? <DataContext.Provider value={{gData: gamesData, nData: newsData}}>
                    <Header/>
                    <Outlet/>
                    <Footer/>
                </DataContext.Provider> :
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }


        </div>
    );
}

export default App;
