import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { DelhiMetroPage } from './pages/DelhiMetroPage';
import { KolkataMetroPage } from './pages/KolkataMetroPage';
import { ChennaiMetroPage } from './pages/ChennaiMetroPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 transition-colors duration-300">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/delhi-metro" element={<DelhiMetroPage />} />
              <Route path="/kolkata-metro" element={<KolkataMetroPage />} />
              <Route path="/chennai-metro" element={<ChennaiMetroPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

