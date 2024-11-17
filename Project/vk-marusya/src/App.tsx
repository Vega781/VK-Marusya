import styles from './App.module.css'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { MainPage } from './pages/mainPage/mainPage'

function App() {
  return (
    <div className={styles.container}>
        <Header />
        <MainPage />
        <Footer />
    </div>
  )
}

export default App
