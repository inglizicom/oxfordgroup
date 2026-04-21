import { Routes, Route } from 'react-router-dom'
import Navbar         from './components/Navbar'
import Footer         from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import HomePage       from './pages/HomePage'
import TeacherProfilePage from './pages/TeacherProfilePage'

export default function App() {
  return (
    <>
      <Navbar />
      <WhatsAppButton />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teacher/:id" element={<TeacherProfilePage />} />
      </Routes>
      <Footer />
    </>
  )
}
