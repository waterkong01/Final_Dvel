import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import React, { useEffect, useState } from "react";
import TopBar from "./component/TopBar";
import SideBar from "./component/SideBar";
import Main from "./pages/Main";
import Home from "./pages/Home";
import Search from "./pages/Search";
import News from "./pages/News";
import Add from "./pages/Add";
import Alarm from "./pages/Alarm";
import MsgMain from "./pages/Msg/MsgMain";
import User from "./pages/User";
import {Provider} from "react-redux";
import Store from "./context/Store";
import ChatStore from "./context/ChatStore";
import Layout from "./styles/Layout";

function App() {
/*
    const [darkMode, setDarkMode] = useState(() => {
        // return document.documentElement.classList.contains("dark");
        return JSON.parse(localStorage.getItem("darkMode")) || false;
    });

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);
*/

  return (
      <>
        <Provider store={Store}>
            {/*<GlobalStyle setDarkMode={setDarkMode} darkMode={darkMode}/>*/}
            <Router>
{/*                <TopBar setDarkMode={setDarkMode} darkMode={darkMode}/>
                <SideBar setDarkMode={setDarkMode} darkMode={darkMode}/>*/}
                <Routes>
                    <Route path="/" element={<ChatStore><Layout/></ChatStore>}>
                        <Route path="" element={<Main/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/search" element={<Search/>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/add" element={<Add/>}/>
                        <Route path="/alarm" element={<Alarm/>}/>
                        <Route path="/msg" element={<MsgMain/>}/>
                        <Route path="/user" element={<User/>}/>
                    </Route>
{/*                    <Route path="/" element={<Main/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/news" element={<News/>}/>
                    <Route path="/add" element={<Add/>}/>
                    <Route path="/alarm" element={<Alarm/>}/>
                    <Route path="/msg" element={<MsgMain/>}/>
                    <Route path="/user" element={<User/>}/>*/}
                </Routes>
            </Router>
        </Provider>
      </>
  );
}

export default App;