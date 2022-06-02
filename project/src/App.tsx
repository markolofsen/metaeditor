import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// global styles
import 'rsuite/dist/rsuite.min.css'
import './App.css';

// ui
import CustomProvider from 'rsuite/CustomProvider';

// views
import HomePage from './views/home/';
import GalleryPage from './views/gallery/';
import PlayerPage from './views/player/';
import DevPage from './views/dev/';


const App: React.FC = () => {
  return (
    <CustomProvider theme='dark'>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/player/:build" element={<PlayerPage />} />
          <Route path="/dev" element={<DevPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Router>
    </CustomProvider>
  )

}

export default App