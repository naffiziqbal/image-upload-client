import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Gallery from './components/Gallery'
import Upload from './components/Upload'
import ImageDetail from './components/ImageDetail'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Gallery />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/image/:id" element={<ImageDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
