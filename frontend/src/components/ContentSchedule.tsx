import { useState, useEffect } from 'react'
import apiService from '../services/api'

interface ContentItem {
  id: string
  title: string
  content: string
  type: 'BLOG_POST' | 'SOCIAL_POST' | 'LINKEDIN_POST' | 'SEO_ARTICLE'
  status: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED' | 'FAILED'
  scheduledFor?: string
  publishedAt?: string
  createdAt: string
  clientId: string
  platform: string[]
  client?: {
    name: string
  }
}

interface ContentScheduleProps {
  userRole: 'admin' | 'client'
}

function ContentSchedule({ userRole }: ContentScheduleProps) {
  const [filter, setFilter] = useState<'all' | 'SCHEDULED' | 'PUBLISHED' | 'DRAFT'>('all')
  const [content, setContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await apiService.getContent()
        setContent(response.data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content')
        console.error('Content fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  const filteredContent = filter === 'all' ? content : content.filter(item => item.status === filter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'bg-green-100 text-green-800'
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800'
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800'
      case 'FAILED':
        return 'bg-red-100 text-red-800'
      case 'ARCHIVED':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'BLOG_POST':
        return '📝'
      case 'LINKEDIN_POST':
        return '💼'
      case 'SOCIAL_POST':
        return '📱'
      case 'SEO_ARTICLE':
        return '🔍'
      default:
        return '📄'
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not scheduled'
    
    const date = new Date(dateString)
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    if (date.toDateString() === now.toDateString()) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    } else {
      return date.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-20 bg-gray-200 rounded-lg mb-6"></div>
          <div className="bg-white rounded-xl p-6">
            <div className="flex space-x-4 mb-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 w-24 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to Load Content</h3>
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

  if (content.length === 0) {
    return (
      <div className="space-y-8">
        <div className={`p-4 rounded-lg ${userRole === 'admin' ? 'bg-secondary-50 border border-secondary-200' : 'bg-primary-50 border border-primary-200'}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{userRole === 'admin' ? '👑' : '📝'}</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {userRole === 'admin' ? 'All Content Schedule' : 'My Content Schedule'}
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  {userRole === 'admin' 
                    ? 'Manage and review scheduled content across all clients'
                    : 'Manage and review your scheduled content'
                  }
                </p>
              </div>
            </div>
            <button className={`text-white font-medium py-2 px-4 rounded-lg transition-colors ${
              userRole === 'admin' 
                ? 'bg-secondary-500 hover:bg-secondary-600' 
                : 'bg-primary-500 hover:bg-primary-600'
            }`}>
              Generate New Content
            </button>
          </div>
        </div>

        <div className="min-h-96 flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-gray-200 p-12">
          <div className="text-center">
            <div className="text-6xl mb-6">✍️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No content created yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md">
              {userRole === 'admin' 
                ? 'No content has been generated for any clients yet. Start by creating content for your clients.'
                : 'You haven\'t created any content yet. Generate your first piece of content to get started.'
              }
            </p>
            <button className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              userRole === 'admin'
                ? 'bg-secondary-500 hover:bg-secondary-600 text-white'
                : 'bg-primary-500 hover:bg-primary-600 text-white'
            }`}>
              Create Your First Content
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className={`p-4 rounded-lg ${userRole === 'admin' ? 'bg-secondary-50 border border-secondary-200' : 'bg-primary-50 border border-primary-200'}`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{userRole === 'admin' ? '👑' : '📝'}</span>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {userRole === 'admin' ? 'All Content Schedule' : 'My Content Schedule'}
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                {userRole === 'admin' 
                  ? 'Manage and review scheduled content across all clients'
                  : 'Manage and review your scheduled content'
                }
              </p>
            </div>
          </div>
          <button className={`text-white font-medium py-2 px-4 rounded-lg transition-colors ${
            userRole === 'admin' 
              ? 'bg-secondary-500 hover:bg-secondary-600' 
              : 'bg-primary-500 hover:bg-primary-600'
          }`}>
            Generate New Content
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-primary-100 text-primary-600' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            All Content ({content.length})
          </button>
          <button
            onClick={() => setFilter('SCHEDULED')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'SCHEDULED' 
                ? 'bg-primary-100 text-primary-600' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Scheduled ({content.filter(c => c.status === 'SCHEDULED').length})
          </button>
          <button
            onClick={() => setFilter('PUBLISHED')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'PUBLISHED' 
                ? 'bg-primary-100 text-primary-600' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Published ({content.filter(c => c.status === 'PUBLISHED').length})
          </button>
          <button
            onClick={() => setFilter('DRAFT')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'DRAFT' 
                ? 'bg-primary-100 text-primary-600' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Drafts ({content.filter(c => c.status === 'DRAFT').length})
          </button>
        </div>

        <div className="space-y-4">
          {filteredContent.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{getTypeIcon(item.type)}</span>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500">
                        {item.client?.name || 'Client'} • {item.platform.join(', ') || 'Platform'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {formatDate(item.status === 'PUBLISHED' ? item.publishedAt : item.scheduledFor)}
                    </p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                      {item.status.toLowerCase()}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-primary-600 hover:text-primary-900 text-sm">
                      Edit
                    </button>
                    <button className="text-secondary-500 hover:text-secondary-700 text-sm">
                      Preview
                    </button>
                    {item.status === 'DRAFT' && (
                      <button className="text-green-600 hover:text-green-900 text-sm">
                        Schedule
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Blog Posts</span>
              <span className="text-sm font-medium">{content.filter(c => c.type === 'BLOG_POST').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">LinkedIn Posts</span>
              <span className="text-sm font-medium">{content.filter(c => c.type === 'LINKEDIN_POST').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Social Media Posts</span>
              <span className="text-sm font-medium">{content.filter(c => c.type === 'SOCIAL_POST').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">SEO Articles</span>
              <span className="text-sm font-medium">{content.filter(c => c.type === 'SEO_ARTICLE').length}</span>
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-900">Total Content</span>
                <span className="text-sm font-medium text-primary-600">{content.length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Breakdown</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">Published Content</p>
                <p className="text-xs text-gray-500">Live and active</p>
              </div>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                {content.filter(c => c.status === 'PUBLISHED').length}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">Scheduled Content</p>
                <p className="text-xs text-gray-500">Ready to publish</p>
              </div>
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                {content.filter(c => c.status === 'SCHEDULED').length}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">Draft Content</p>
                <p className="text-xs text-gray-500">In progress</p>
              </div>
              <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                {content.filter(c => c.status === 'DRAFT').length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentSchedule