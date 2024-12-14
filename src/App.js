// App.js veya Router Yapısı
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/Hero';
import MovieDetail from './components/MovieDetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/details/:imdbID" element={<MovieDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
