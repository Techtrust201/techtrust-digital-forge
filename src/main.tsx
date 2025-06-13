
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Simple redirect to Next.js app
function App() {
  React.useEffect(() => {
    // Redirect to the Next.js app running on the same port
    window.location.href = '/'
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">TechTrust</h1>
        <p className="text-gray-600">Redirection vers l'application...</p>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
