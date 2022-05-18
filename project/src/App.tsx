import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

// views
import HomePage from './views/home/';
import PlayerPage from './views/player/';



const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/player/:build" element={<PlayerPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  )

}

export default App