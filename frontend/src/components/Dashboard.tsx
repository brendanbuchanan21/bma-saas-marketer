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

function Dashboard() {
  const stats = [
    { title: 'Active Clients', value: '8', change: '12%', changeType: 'positive' as const },
    { title: 'Posts This Month', value: '147', change: '8%', changeType: 'positive' as const },
    { title: 'Scheduled Posts', value: '32', change: '4%', changeType: 'positive' as const },
    { title: 'Published Today', value: '6', change: '0%', changeType: 'positive' as const },
  ]

  const recentActivity = [
    { client: 'Tech Startup Co', action: 'Blog post published', time: '2 hours ago' },
    { client: 'Local Restaurant', action: 'LinkedIn post scheduled', time: '4 hours ago' },
    { client: 'Fitness Studio', action: 'Content generated', time: '6 hours ago' },
    { client: 'E-commerce Store', action: 'WordPress post published', time: '8 hours ago' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="mt-1 text-sm text-gray-600">
          Overview of your content automation platform
        </p>
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
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.client}</p>
                    <p className="text-sm text-gray-500">{activity.action}</p>
                  </div>
                  <div className="text-sm text-gray-400">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                Generate Content Now
              </button>
              <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-200 transition-colors">
                Add New Client
              </button>
              <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-200 transition-colors">
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard