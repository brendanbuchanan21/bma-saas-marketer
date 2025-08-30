import { useState } from 'react'
import Dashboard from './components/Dashboard'
import ClientProfile from './components/ClientProfile'
import ContentSchedule from './components/ContentSchedule'

type Page = 'dashboard' | 'clients' | 'content'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'clients':
        return <ClientProfile />
      case 'content':
        return <ContentSchedule />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                BMA Content Studio
              </h1>
            </div>
            <div className="flex space-x-1">
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === 'dashboard' 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                onClick={() => setCurrentPage('dashboard')}
              >
                Dashboard
              </button>
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === 'clients' 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                onClick={() => setCurrentPage('clients')}
              >
                Clients
              </button>
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === 'content' 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                onClick={() => setCurrentPage('content')}
              >
                Content
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
