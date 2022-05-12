import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import User from './pages/User';
import NotFound from './pages/NotFound';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Alert from './components/Layout/Alert';
import { GithubContextProvider } from './context/Github/GithubContext';
import { AlertContextProvider } from './context/Alert/AlertContext';

const App = () => {
  return (
    <GithubContextProvider>
      <AlertContextProvider>
        <BrowserRouter>
          <div className="flex flex-col justify-between h-screen">
            <Navbar />
            <main className="container px-3 pb-12 mx-auto">
              <Alert />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/user/:login" element={<User />} />
                <Route path="/notfound" element={<NotFound />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AlertContextProvider>
    </GithubContextProvider>
  );
};

export default App;
