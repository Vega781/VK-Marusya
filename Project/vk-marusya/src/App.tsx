import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styles from './App.module.css'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { MainPage } from './pages/MainPage/MainPage'
import { GenresPage } from './pages/genresPage/GenresPage'
import { ListByGenre } from './components/ListByGenre/ListByGenre'
import { MoviePage } from './pages/MoviePage/MoviePage'
import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className={styles.container}>
                    <Header />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/movie/:id" element={<MoviePage />} />
                        <Route path="/genres" element={<GenresPage />} />
                        <Route path="/genres/:genre" element={<ListByGenre />} />
                    </Routes>
                    <Footer />
                </div>
            </BrowserRouter>
        </Provider>
    )
}

export default App
