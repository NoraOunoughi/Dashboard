import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from "./pages/user/User";
import Home from "./pages/home/Home";
import Weather from "./pages/weather/Weather";
import Github from "./pages/github/Github";
import Youtube from "./pages/youtube/Youtube";
import { useState } from "react";
import Start from "./pages/login/start";

export default function MyRoute() {

    var logged = localStorage.getItem("isLogged");

    const [isLogged, setIsLogged] = useState(false) 
    return (
        <BrowserRouter> {
            !logged ?
            <Routes>
                <Route path="/" element={<Start />} />
            </Routes>
            :
            <div>
                <Topbar />
                <div className="containerbis">
                    <Sidebar />
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/weather" element={<Weather />} />
                        <Route path="/profil" element={<User />} />
                        <Route path="/youtube" element={<Youtube />} />
                        <Route path="/github" element={<Github />} />
                    </Routes>
                </div>
            </div>
            }
        </BrowserRouter>
);
}