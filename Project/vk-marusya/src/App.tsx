import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styles from './App.module.css'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { MainPage } from './pages/MainPage/mainPage'
import { GenresPage } from './pages/genresPage/GenresPage'
import { ListByGenre } from './components/ListByGenre/ListByGenre'
import { MoviePage } from './pages/MoviePage/MoviePage'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { UserPage } from './pages/userPage/UserPage'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './api/queryClient'

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <BrowserRouter>
                    <div className={styles.container}>
                        <Header />
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/profile" element={<UserPage />} />
                            <Route path="/movie/:id" element={<MoviePage />} />
                            <Route path="/genres" element={<GenresPage />} />
                            <Route path="/genres/:genre" element={<ListByGenre />} />
                        </Routes>
                        <Footer />
                    </div>
                </BrowserRouter>
            </Provider>
        </QueryClientProvider>
    )
}

export default App
