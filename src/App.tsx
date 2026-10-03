import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import PublicPortfolio from './pages/PublicPortfolio'
import Loader from './components/Loader'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="bg-dark-bg min-h-screen">
      <AnimatePresence>
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      {!isLoading && <PublicPortfolio />}
    </div>
  )
}

export default App
