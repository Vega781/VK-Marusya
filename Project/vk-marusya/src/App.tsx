import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import styles from './App.module.css'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { MainPage } from './pages/MainPage/MainPage'
import { GenresPage } from './pages/genresPage/GenresPage'
import { ListByGenre } from './components/ListByGenre/ListByGenre'
import { MoviePage } from './pages/MoviePage/MoviePage'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { UserPage } from './pages/userPage/UserPage'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './api/queryClient'
import { useEffect, useRef } from 'react'
import { fadeIn } from './animations/animations'
import { AnimatedRoute } from './components/AnimatedRoute/AnimatedRoute'
import './styles/customScroll.css';

function AnimatedRoutes() {
    const location = useLocation();
    
    return (
        <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                    <AnimatedRoute>
                        <MainPage />
                    </AnimatedRoute>
                } />
                <Route path="/profile" element={
                    <AnimatedRoute>
                        <UserPage />
                    </AnimatedRoute>
                } />
                <Route path="/movie/:id" element={
                    <AnimatedRoute>
                        <MoviePage />
                    </AnimatedRoute>
                } />
                <Route path="/genres" element={
                    <AnimatedRoute>
                        <GenresPage />
                    </AnimatedRoute>
                } />
                <Route path="/genres/:genre" element={
                    <AnimatedRoute>
                        <ListByGenre />
                    </AnimatedRoute>
                } />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            fadeIn(containerRef.current);
        }
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <BrowserRouter>
                    <div className={styles.container} ref={containerRef}>
                        <Header />
                        <AnimatedRoutes />
                        <Footer />
                    </div>
                </BrowserRouter>
            </Provider>
        </QueryClientProvider>
    )
}

export default App
