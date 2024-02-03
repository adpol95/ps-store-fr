import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Games from "./Modules/sections/game_dir/Games";
import Consoles from "./Modules/sections/consl_dir/Consoles";
import Accessories from "./Modules/sections/acces_dir/Accessories";
import Home from "./Modules/Home";
import PsnMain from "./Modules/network/PsnMain";
import News from "./Modules/sections/news_dir/News";
import GamePage from "./Modules/sections/game_dir/GamePage";
import ConsolePage from "./Modules/sections/consl_dir/ConsolePage";
import AccessoriesPage from "./Modules/sections/acces_dir/AccessoriesPage";
import NewsPage from "./Modules/sections/news_dir/NewsPage";
import Authorization from "./Modules/sections/authorization_dir/Authorization";
import Registration from "./Modules/sections/authorization_dir/Registration";


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
                children: [
                    {
                        path: "",
                        element: <Accessories/>
                    },
                    {
                        path: ":id",
                        element: <AccessoriesPage/>
                    },
                ]
            },
            {
                path: "news",
                children: [
                    {
                        path: "",
                        element: <News/>
                    },
                    {
                        path: ":id",
                        element: <NewsPage/>
                    },
                ]
            },
            {
                path: "psn",
                element: <PsnMain/>,
            },
            {
                path: "authorization",
                children: [
                    {
                        path: "",
                        element: <Authorization/>
                    },
                    {
                        path: "registration",
                        element: <Registration/>
                    },
                ]
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
