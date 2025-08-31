interface LandingPageProps {
  onGetStarted: () => void
}

function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: '🤖',
      title: 'AI Content Generation',
      description: 'Generate high-quality blog posts and social content tailored to your business using advanced AI technology.',
    },
    {
      icon: '📅',
      title: 'Automated Scheduling',
      description: 'Publish content daily across WordPress and LinkedIn with zero manual intervention, 7 days a week.',
    },
    {
      icon: '🎯',
      title: 'SEO Optimization',
      description: 'Every piece of content includes proper metadata, keywords, and formatting for maximum search visibility.',
    },
    {
      icon: '📊',
      title: 'Performance Analytics',
      description: 'Track engagement, reach, and performance metrics across all your content and platforms.',
    },
  ]

  const process = [
    {
      step: '1',
      title: 'Setup Your Profile',
      description: 'Provide your business context, industry, values, and target keywords.',
    },
    {
      step: '2',
      title: 'AI Generates Content',
      description: 'Our AI creates engaging, brand-specific content automatically.',
    },
    {
      step: '3',
      title: 'Auto-Publish & Grow',
      description: 'Content goes live on your WordPress and LinkedIn daily.',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 via-white to-primary-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-2 h-2 bg-accent-400 rounded-full opacity-60"></div>
          <div className="absolute top-32 right-20 w-1 h-1 bg-accent-400 rounded-full opacity-40"></div>
          <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-accent-400 rounded-full opacity-50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Automate Your <br />
              <span className="text-primary-600 relative">
                Content Creation
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-accent-400 opacity-30"></div>
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your content strategy with AI-powered automation. Generate and publish 
              high-quality blog posts and social content to WordPress and LinkedIn daily, 
              without lifting a finger.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={onGetStarted}
                className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started
              </button>
              <button 
                onClick={onGetStarted}
                className="text-primary-600 hover:text-primary-700 font-medium py-4 px-8 rounded-xl border border-primary-200 hover:border-primary-300 transition-colors bg-white"
              >
                Learn More
              </button>
            </div>
            
            <div className="mt-12 text-sm text-gray-500">
              <span className="inline-flex items-center">
                <div className="w-2 h-2 bg-accent-400 rounded-full mr-2"></div>
                Professional content automation • Quick setup
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Scale Content
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to save you time and grow your online presence automatically.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 hover:border-primary-200 transition-all duration-200 hover:shadow-lg group">
                <div className="text-4xl mb-4 relative">
                  {feature.icon}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple Setup, Powerful Results
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes with our streamlined onboarding process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center relative">
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-200 to-primary-100 transform translate-x-1/2"></div>
                )}
                <div className="relative z-10 bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-primary-100">
                  <span className="text-2xl font-bold text-primary-600">{step.step}</span>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent-400 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Focus on Your Business, <br />
                <span className="text-primary-600 relative">
                  We Handle Content
                  <div className="absolute -bottom-1 left-0 w-3/4 h-1 bg-accent-400 opacity-20"></div>
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Stop spending hours on content creation. Our AI understands your business 
                and creates engaging posts that resonate with your audience while you 
                focus on what matters most.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Save 10+ hours per week on content creation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Consistent daily publishing across platforms</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">SEO-optimized content that drives traffic</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 border border-primary-100">
                <div className="text-center">
                  <div className="text-5xl mb-4">📈</div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">300%</div>
                  <div className="text-gray-600 mb-4">Average increase in content output</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary-500 to-accent-400 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent-100 rounded-full opacity-60"></div>
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-accent-400 rounded-full opacity-40"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-24 bg-gradient-to-br from-primary-600 to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-3 h-3 bg-accent-400 rounded-full opacity-30"></div>
          <div className="absolute bottom-16 left-16 w-2 h-2 bg-accent-400 rounded-full opacity-40"></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-accent-400 rounded-full opacity-50"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Content Strategy?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join hundreds of businesses already automating their content creation with BMA Content Studio.
          </p>
          
          <button 
            onClick={onGetStarted}
            className="bg-white text-primary-600 hover:text-primary-700 font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started Today
          </button>
          
          <div className="mt-6 text-primary-100 text-sm">
            <span className="inline-flex items-center">
              <div className="w-2 h-2 bg-accent-400 rounded-full mr-2"></div>
              Streamlined setup • Expert support included
            </span>
          </div>
        </div>
      </div>

      {/* Simple Footer */}
      <div className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">BMA Content Studio</h3>
            <p className="text-gray-400 text-sm">
              Automated content creation for modern businesses
            </p>
            <div className="mt-4 flex justify-center">
              <div className="w-3 h-3 bg-accent-400 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage