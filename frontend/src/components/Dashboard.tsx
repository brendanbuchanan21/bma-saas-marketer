import { useState, useEffect } from 'react'
import apiService from '../services/api'
import OnboardingFlow from './OnboardingFlow'
import type { OnboardingData } from './OnboardingFlow'

interface StatsCardProps {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative'
}

function StatsCard({ title, value, change, changeType }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      </div>
      <div className="mt-2">
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <div className="mt-2 flex items-center">
          <span className={`text-sm font-medium ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
            {changeType === 'positive' ? '+' : ''}{change}
          </span>
          <span className="text-sm text-gray-500 ml-1">from last month</span>
        </div>
      </div>
    </div>
  )
}

interface DashboardProps {
  userRole: 'admin' | 'client'
}

function EmptyState({ 
  userRole, 
  onStartOnboarding 
}: { 
  userRole: 'admin' | 'client'
  onStartOnboarding: () => void 
}) {
  return (
    <div className="min-h-96 flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-gray-200 p-12">
      <div className="text-center">
        <div className="text-6xl mb-6">🚀</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Welcome to BMA Content Studio!
        </h3>
        <p className="text-gray-600 mb-8 max-w-md">
          {userRole === 'admin' 
            ? 'No clients have been added yet. Start by adding your first client to begin automating their content.'
            : 'Your profile hasn\'t been set up yet. Complete your business profile to start generating automated content.'
          }
        </p>
        <div className="space-y-4">
          <button 
            onClick={onStartOnboarding}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              userRole === 'admin'
                ? 'bg-secondary-500 hover:bg-secondary-600 text-white'
                : 'bg-primary-500 hover:bg-primary-600 text-white'
            }`}
          >
            {userRole === 'admin' ? 'Add Your First Client' : 'Setup Your Profile'}
          </button>
          <div className="text-sm text-gray-500">
            Get started in less than 5 minutes
          </div>
        </div>
      </div>
    </div>
  )
}

function Dashboard({ userRole }: DashboardProps) {
  const [loading, setLoading] = useState(true)
  const [clients, setClients] = useState([])
  const [content, setContent] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [error, setError] = useState<string | null>(null)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [onboardingLoading, setOnboardingLoading] = useState(false)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const [clientsData, contentData, analyticsData] = await Promise.all([
          apiService.getClients().catch(() => ({ success: false, data: [] })),
          apiService.getContent().catch(() => ({ success: false, data: [] })),
          apiService.getAnalyticsOverview().catch(() => ({ success: false, data: null }))
        ])

        setClients(clientsData.data || [])
        setContent(contentData.data || [])
        setAnalytics(analyticsData.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data')
        console.error('Dashboard data fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const handleOnboardingComplete = async (data: OnboardingData) => {
    try {
      setOnboardingLoading(true)
      
      // Create client profile with onboarding data
      await apiService.createClient({
        name: data.businessName,
        industry: data.industry,
        description: data.description,
        services: data.services,
        targetKeywords: data.keywords,
        brandVoice: data.brandVoice,
        website: data.website,
        linkedinProfile: data.linkedinProfile,
        contentPreferences: {
          targetAudience: data.targetAudience,
          goals: data.goals,
          contentTypes: data.contentTypes
        }
      })

      // Refresh dashboard data
      const [clientsData, contentData] = await Promise.all([
        apiService.getClients().catch(() => ({ data: [] })),
        apiService.getContent().catch(() => ({ data: [] }))
      ])

      setClients(clientsData.data || [])
      setContent(contentData.data || [])
      setShowOnboarding(false)
    } catch (err) {
      console.error('Failed to save profile:', err)
      setError('Failed to save profile. Please try again.')
    } finally {
      setOnboardingLoading(false)
    }
  }

  const handleSkipOnboarding = () => {
    setShowOnboarding(false)
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-20 bg-gray-200 rounded-lg mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-80 bg-gray-200 rounded-xl"></div>
            <div className="h-80 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to Load Dashboard</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  // Show onboarding flow if triggered
  if (showOnboarding) {
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Let's set up your profile</h1>
          <p className="text-gray-600">This will help us create personalized content for your business.</p>
        </div>
        
        {onboardingLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <span className="ml-3 text-gray-600">Saving your profile...</span>
          </div>
        ) : (
          <OnboardingFlow 
            onComplete={handleOnboardingComplete}
            onSkip={handleSkipOnboarding}
          />
        )}
      </div>
    )
  }

  // Show empty state if no clients (for admin) or no profile setup (for client)
  const hasData = clients.length > 0 || content.length > 0
  if (!hasData) {
    return <EmptyState 
      userRole={userRole} 
      onStartOnboarding={() => setShowOnboarding(true)}
    />
  }

  // Calculate stats from real data
  const stats = userRole === 'admin' ? [
    { title: 'Active Clients', value: clients.length.toString(), change: '0%', changeType: 'positive' as const },
    { title: 'Total Content', value: content.length.toString(), change: '0%', changeType: 'positive' as const },
    { title: 'Published Posts', value: content.filter((c: any) => c.status === 'PUBLISHED').length.toString(), change: '0%', changeType: 'positive' as const },
    { title: 'Scheduled Posts', value: content.filter((c: any) => c.status === 'SCHEDULED').length.toString(), change: '0%', changeType: 'positive' as const },
  ] : [
    { title: 'Your Content', value: content.length.toString(), change: '0%', changeType: 'positive' as const },
    { title: 'Published Posts', value: content.filter((c: any) => c.status === 'PUBLISHED').length.toString(), change: '0%', changeType: 'positive' as const },
    { title: 'Scheduled Posts', value: content.filter((c: any) => c.status === 'SCHEDULED').length.toString(), change: '0%', changeType: 'positive' as const },
    { title: 'Draft Posts', value: content.filter((c: any) => c.status === 'DRAFT').length.toString(), change: '0%', changeType: 'positive' as const },
  ]

  return (
    <div className="space-y-8">
      <div className={`p-4 rounded-lg ${userRole === 'admin' ? 'bg-secondary-50 border border-secondary-200' : 'bg-primary-50 border border-primary-200'}`}>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{userRole === 'admin' ? '👑' : '👤'}</span>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {userRole === 'admin' ? 'Admin Dashboard' : 'Client Dashboard'}
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {userRole === 'admin' 
                ? 'Manage all clients and monitor system-wide content automation' 
                : 'Overview of your content automation and publishing'
              }
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            {content.length > 0 ? (
              <div className="space-y-4">
                {content.slice(0, 4).map((item: any, index) => (
                  <div key={index} className="flex items-center justify-between py-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                      <p className="text-sm text-gray-500">Status: {item.status}</p>
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No recent activity to display
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <button className={`w-full text-white font-medium py-3 px-4 rounded-lg transition-colors ${
                userRole === 'admin' 
                  ? 'bg-secondary-500 hover:bg-secondary-600' 
                  : 'bg-primary-500 hover:bg-primary-600'
              }`}>
                Generate Content Now
              </button>
              {userRole === 'admin' && (
                <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-200 transition-colors">
                  Add New Client
                </button>
              )}
              <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-200 transition-colors">
                {userRole === 'admin' ? 'System Analytics' : 'My Analytics'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard