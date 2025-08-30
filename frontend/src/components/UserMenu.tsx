import { useState, useRef, useEffect } from 'react'

interface User {
  name: string
  email: string
  role: 'admin' | 'client'
  avatar?: string
}

interface UserMenuProps {
  user: User
  onLogout: () => void
}

function UserMenu({ user, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase()

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
          user.role === 'admin' ? 'bg-secondary-500' : 'bg-primary-500'
        }`}>
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
          ) : (
            initials
          )}
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-gray-900">{user.name}</div>
          <div className="text-xs text-gray-500 capitalize">
            {user.role}
            {user.role === 'admin' && (
              <span className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                Admin
              </span>
            )}
          </div>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <div className="mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                user.role === 'admin' 
                  ? 'bg-secondary-100 text-secondary-800' 
                  : 'bg-primary-100 text-primary-800'
              }`}>
                {user.role === 'admin' ? '👑 Administrator' : '👤 Client'}
              </span>
            </div>
          </div>
          
          <div className="py-1">
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <span className="mr-2">👤</span>
                Profile Settings
              </div>
            </button>
            
            {user.role === 'admin' && (
              <>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <span className="mr-2">⚙️</span>
                    Admin Panel
                  </div>
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <span className="mr-2">📊</span>
                    System Analytics
                  </div>
                </button>
              </>
            )}
            
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <span className="mr-2">🔔</span>
                Notifications
              </div>
            </button>
            
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <span className="mr-2">❓</span>
                Help & Support
              </div>
            </button>
          </div>
          
          <div className="border-t border-gray-200 py-1">
            <button 
              onClick={onLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors"
            >
              <div className="flex items-center">
                <span className="mr-2">🚪</span>
                Sign Out
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu