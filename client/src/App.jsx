import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import DataSection from './components/DataSection'
import HallmarksSection from './components/HallmarksSection'
import ResourcesPage from './pages/ResourcesPage'
import ChatPanel from './components/ChatPanel'

function HomePage() {
  return (
    <>
      <Hero />
      <DataSection />
      <HallmarksSection />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resources" element={<ResourcesPage />} />
      </Routes>
      <ChatPanel />
    </BrowserRouter>
  )
}
