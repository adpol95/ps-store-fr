import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Games from "./components/products/game_dir/Games";
import Consoles from "./components/products/consl_dir/Consoles";
import Accessories from "./components/products/acces_dir/Accessories";
import Home from "./components/Home";
import News from "./components/news_dir/News";
import GamePage from "./components/products/game_dir/GamePage";
import ConsolePage from "./components/products/consl_dir/ConsolePage";
import AccessoriesPage from "./components/products/acces_dir/AccessoriesPage";
import NewsPage from "./components/news_dir/NewsPage";
import Login from "./components/authorization_dir/Login";
import Registration from "./components/authorization_dir/Registration";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import Logout from "./components/authorization_dir/Logout";
import Profile from "./components/network_dir/Profile";
import Conundrums from "./components/network_dir/Conundrums";
import AcSettings from "./components/authorization_dir/AcSettings";
import Friends from "./components/network_dir/Friends";
import AddNewFriend from "./components/network_dir/AddNewFriend";
import MainNet from "./components/network_dir/MainNet";
import ProfileMainPage from "./components/network_dir/ProfileMainPage";
import Basket from "./components/order/Basket";
import Payment from "./components/order/Payment";
import SchoolProgram from "./components/network_dir/SchoolProgram";
import Riddles from "./components/network_dir/Riddles";


const root = ReactDOM.createRoot(document.getElementById('root'));

// const my_refresh_api = createRefresh({
//     interval: 120, // The time in sec to refresh the Access token,
//     refreshApiCallback: async (param) => {
//         try {
//             const response = await fetch("/refresh", {
//                 method: "POST",
//                 body: JSON.stringify(param),
//                 headers: {'Authorization': `Bearer ${param.authToken}`}
//             })
//             console.log("Refreshing")
//             return {
//                 isSuccess: true,
//                 newAuthToken: response.data.token,
//                 newAuthTokenExpireIn: 10,
//                 newRefreshTokenExpiresIn: 60
//             }
//         }
//         catch(error){
//             console.error(error)
//             return {
//                 isSuccess: false
//             }
//         }
//     }
// })

const store2 = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: false,
    // refresh: my_refresh_api
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
                    {
                        path: "account-setting",
                        element: <AcSettings/>
                    },
                ]
            },
            {
                path: "psn",
                element: <RequireAuth fallbackPath={'/authorization'}>
                    <MainNet/>
                </RequireAuth>,
                children: [
                    {
                        path: "",
                        element: <RequireAuth fallbackPath={'/authorization'}>
                            <Profile/>
                        </RequireAuth>,
                    },
                    {
                        path: "friends",
                        children: [
                            {
                                path: "",
                                element: <RequireAuth fallbackPath={'/authorization'}>
                                    <Friends/>
                                </RequireAuth>,
                            },
                            {
                                path: "add",
                                element: <RequireAuth fallbackPath={'/authorization'}>
                                    <AddNewFriend/>
                                </RequireAuth>,
                            },
                            {
                                path: ":id",
                                element: <RequireAuth fallbackPath={'/authorization'}>
                                    <ProfileMainPage/>
                                </RequireAuth>,
                            }
                        ]

                    }
                ]
            },
            {
                path: "conundrums",
                children: [
                    {
                        path: "",
                        element: <Conundrums/>
                    },
                    {
                        path: "riddles",
                        element: <Riddles/>
                    },
                    {
                        path: "schoolPrg",
                        element: <SchoolProgram/>
                    }
                ]
            },
            {
                path: "basket",
                children: [
                    {
                        path: "",
                        element: <Basket/>
                    },
                    {
                        path: "payment",
                        element: <Payment/>
                    }
                ]
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
