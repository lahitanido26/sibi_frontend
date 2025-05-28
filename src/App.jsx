// Made by Kyle (https://github.com/kt946)
import { BrowserRouter } from 'react-router-dom'
import { useEffect, useState } from 'react'
// import useSelector hook from react-redux to access state
import { useSelector } from 'react-redux'

// import Main component that contains all the routes
import { MainSection } from './components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  // get darkMode state from store
  const darkMode = useSelector((state) => state.darkMode.value)
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    // This will make the client available to all components
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-gray-100">
          {/* Router and Routes are located in Main */}
          <MainSection />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
