import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Games from "./Modules/sections/game_dir/Games";
import Consoles from "./Modules/sections/consl_dir/Consoles";
import Accessories from "./Modules/sections/Accessories";
import Home from "./Modules/Home";
import PsnMain from "./Modules/network/PsnMain";
import News from "./Modules/sections/News";
import GamePage from "./Modules/sections/game_dir/GamePage";
import GamesMain from "./Modules/sections/game_dir/GamesMain";
import ConsolesMain from "./Modules/sections/consl_dir/ConsolesMain";
import ConsolePage from "./Modules/sections/consl_dir/ConsolePage";

const root = ReactDOM.createRoot(document.getElementById('root'));


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "games",
                element: <GamesMain/>,
                children: [
                    {
                        path: "",
                        element: <Games/>
                    },
                    {
                        path: ":id",
                        element: <GamePage/>
                    },
                ]
            },
            {
                path: "consoles",
                element: <ConsolesMain/>,
                children: [
                    {
                        path: "",
                        element: <Consoles/>
                    },
                    {
                        path: ":id",
                        element: <ConsolePage/>
                    },
                ]
            },
            {
                path: "accessories",
                element: <Accessories/>,
            },
            {
                path: "news",
                element: <News/>,
            },
            {
                path: "psn",
                element: <PsnMain/>,
            },
        ],
    },
]);

root.render(
    <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
