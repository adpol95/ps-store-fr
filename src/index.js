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
import Login from "./Modules/sections/authorization_dir/Login";
import Registration from "./Modules/sections/authorization_dir/Registration";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import Logout from "./Modules/sections/authorization_dir/Logout";


const root = ReactDOM.createRoot(document.getElementById('root'));

const store2 = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: false,
});


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
                path: "authorization",
                children: [
                    {
                        path: "",
                        element: <Login/>
                    },
                    {
                        path: "logout",
                        element: <Logout/>
                    },
                    {
                        path: "registration",
                        element: <Registration/>
                    },
                ]
            },
            {
                path: "psn",
                element: <RequireAuth fallbackPath={'/authorization'}>
                    <PsnMain/>
                </RequireAuth>,
            },
        ],
    },
]);
root.render(
    <AuthProvider store={store2}>
        <RouterProvider router={router}/>
    </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
