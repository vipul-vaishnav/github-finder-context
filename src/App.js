import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import { GithubContextProvider } from './context/Github/GithubContext';

const App = () => {
  return (
    <GithubContextProvider>
      <BrowserRouter>
        <div className="flex flex-col justify-between h-screen">
          <Navbar />
          <main className="container px-3 pb-12 mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/notfound" element={<NotFound />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </GithubContextProvider>
  );
};

export default App;
