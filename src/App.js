import './App.css';
import React, {useState} from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {

    const apiKey = process.env.REACT_APP_NEWS_API;
    const pageSize = 5;
    const [progress, setProgress] = useState(0)


    return (
        <div>
            <Router>
                <NavBar/>
                <LoadingBar height={4} color="#f11946" progress={progress}/>
                <Routes>
                    <Route exact path ="/" element = {<News setProgress= {setProgress} apiKey = {apiKey} pageSize = {pageSize} country = "in" category = "domestic,technology,sports,entertainment"/>}/>
                    <Route exact path ="/domestic" element = {<News setProgress = {setProgress} apiKey = {apiKey} key = "domestic" pageSize = {pageSize} country = "in" category = "domestic"/>}/>
                    <Route exact path ="/technology" element = {<News setProgress = {setProgress} apiKey = {apiKey} key = "technology" pageSize = {pageSize} country = "in" category = "technology"/>}/>
                    <Route exact path ="/sports" element = {<News setProgress = {setProgress} apiKey = {apiKey} key = "sports" pageSize = {pageSize} country = "in" category = "sports"/>}/>
                    <Route exact path ="/entertainment" element = {<News setProgress = {setProgress} apiKey = {apiKey} key = "entertainment" pageSize = {pageSize} country = "in" category = "entertainment"/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App