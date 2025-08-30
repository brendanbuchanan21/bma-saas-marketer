import { useState } from 'react'

interface ContentItem {
  id: string
  client: string
  title: string
  type: 'blog' | 'linkedin' | 'social'
  status: 'scheduled' | 'published' | 'draft'
  scheduledDate: string
  platform: string
}

interface ContentScheduleProps {
  userRole: 'admin' | 'client'
}

function ContentSchedule({ userRole }: ContentScheduleProps) {
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'published' | 'draft'>('all')
  const [content] = useState<ContentItem[]>([
    {
      id: '1',
      client: 'Tech Startup Co',
      title: '10 Latest Trends in AI Development',
      type: 'blog',
      status: 'scheduled',
      scheduledDate: 'Tomorrow, 9:00 AM',
      platform: 'WordPress'
    },
    {
      id: '2',
      client: 'Local Restaurant',
      title: 'New Summer Menu Launch',
      type: 'linkedin',
      status: 'published',
      scheduledDate: 'Today, 12:00 PM',
      platform: 'LinkedIn'
    },
    {
      id: '3',
      client: 'Fitness Studio',
      title: 'Morning Workout Routine Tips',
      type: 'social',
      status: 'scheduled',
      scheduledDate: 'Tomorrow, 7:00 AM',
      platform: 'LinkedIn'
    },
    {
      id: '4',
      client: 'E-commerce Store',
      title: 'Black Friday Sale Preparation Guide',
      type: 'blog',
      status: 'draft',
      scheduledDate: 'Not scheduled',
      platform: 'WordPress'
    },
  ])

  const filteredContent = filter === 'all' ? content : content.filter(item => item.status === filter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blog':
        return '📝'
      case 'linkedin':
        return '💼'
      case 'social':
        return '📱'
      default:
        return '📄'
    }
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
            onClick={() => setFilter('scheduled')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'scheduled' 
                ? 'bg-primary-100 text-primary-600' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Scheduled ({content.filter(c => c.status === 'scheduled').length})
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'published' 
                ? 'bg-primary-100 text-primary-600' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Published ({content.filter(c => c.status === 'published').length})
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'draft' 
                ? 'bg-primary-100 text-primary-600' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Drafts ({content.filter(c => c.status === 'draft').length})
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
                      <p className="text-sm text-gray-500">{item.client} • {item.platform}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{item.scheduledDate}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-primary-600 hover:text-primary-900 text-sm">
                      Edit
                    </button>
                    <button className="text-secondary-500 hover:text-secondary-700 text-sm">
                      Preview
                    </button>
                    {item.status === 'draft' && (
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Blog Posts This Month</span>
              <span className="text-sm font-medium">84</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">LinkedIn Posts</span>
              <span className="text-sm font-medium">42</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Social Media Posts</span>
              <span className="text-sm font-medium">21</span>
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-900">Total Engagement</span>
                <span className="text-sm font-medium text-green-600">+18% ↗</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">Tech Startup Co</p>
                <p className="text-xs text-gray-500">Blog post due tomorrow</p>
              </div>
              <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                Due Soon
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">Fitness Studio</p>
                <p className="text-xs text-gray-500">LinkedIn post scheduled</p>
              </div>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                On Track
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">Local Restaurant</p>
                <p className="text-xs text-gray-500">Content review pending</p>
              </div>
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                Review
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentSchedule