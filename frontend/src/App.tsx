import { useState } from 'react'
import Dashboard from './components/Dashboard'
import ClientProfile from './components/ClientProfile'
import ContentSchedule from './components/ContentSchedule'
import AuthModal from './components/AuthModal'
import UserMenu from './components/UserMenu'
import LandingPage from './components/LandingPage'

type Page = 'dashboard' | 'clients' | 'content'

interface User {
  name: string
  email: string
  role: 'admin' | 'client'
  avatar?: string
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')
  const [user, setUser] = useState<User | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)

  const handleLogin = async (email: string, password: string) => {
    // Mock authentication - replace with Firebase
    const mockUser: User = {
      name: email === 'admin@bma.com' ? 'Admin User' : 'Client User',
      email: email,
      role: email === 'admin@bma.com' ? 'admin' : 'client'
    }
    setUser(mockUser)
  }

  const handleRegister = async (name: string, email: string, password: string) => {
    // Mock registration - replace with Firebase
    const mockUser: User = {
      name: name,
      email: email,
      role: 'client' // New users start as clients
    }
    setUser(mockUser)
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentPage('dashboard')
  }

  const renderPage = () => {
    if (!user) {
      return <LandingPage onGetStarted={() => setShowAuthModal(true)} />
    }

    // Show different content based on user role
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard userRole={user.role} />
      case 'clients':
        return user.role === 'admin' ? <ClientProfile /> : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Access Restricted</h3>
            <p className="text-gray-600">This section is only available to administrators.</p>
          </div>
        )
      case 'content':
        return <ContentSchedule userRole={user.role} />
      default:
        return <Dashboard userRole={user.role} />
    }
  }

  if (!user) {
    return (
      <>
        {renderPage()}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      </>
    )
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
            <div className="flex items-center space-x-4">
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
                {user.role === 'admin' && (
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
                )}
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
              
              <UserMenu user={user} onLogout={handleLogout} />
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  )
}

export default App
