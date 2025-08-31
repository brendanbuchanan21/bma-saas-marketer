import { useState } from 'react'

export interface OnboardingData {
  businessName: string
  industry: string
  description: string
  services: string[]
  targetAudience: string
  brandVoice: string
  keywords: string[]
  goals: string[]
  contentTypes: string[]
  website: string
  linkedinProfile: string
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void
  onSkip: () => void
}

const QUESTIONS = [
  {
    id: 'businessName',
    title: 'What\'s your business name?',
    subtitle: 'This will help us personalize your content and maintain brand consistency.',
    type: 'text' as const,
    required: true,
    placeholder: 'Enter your business name...'
  },
  {
    id: 'industry',
    title: 'What industry are you in?',
    subtitle: 'Understanding your industry helps us create relevant, targeted content.',
    type: 'select' as const,
    required: true,
    options: [
      'Technology & Software',
      'Healthcare & Medical',
      'Finance & Banking',
      'Real Estate',
      'E-commerce & Retail',
      'Food & Beverage',
      'Fitness & Wellness',
      'Education & Training',
      'Professional Services',
      'Manufacturing',
      'Construction',
      'Marketing & Advertising',
      'Non-profit',
      'Other'
    ]
  },
  {
    id: 'description',
    title: 'Tell us about your business',
    subtitle: 'A brief description helps our AI understand your unique value proposition.',
    type: 'textarea' as const,
    required: true,
    placeholder: 'What does your business do? What makes you unique?'
  },
  {
    id: 'services',
    title: 'What are your main products or services?',
    subtitle: 'List your key offerings so we can highlight them in your content.',
    type: 'tags' as const,
    required: true,
    placeholder: 'Add a service and press Enter...'
  },
  {
    id: 'targetAudience',
    title: 'Who is your target audience?',
    subtitle: 'Describe your ideal customers to help us tailor content that resonates.',
    type: 'textarea' as const,
    required: true,
    placeholder: 'Age range, demographics, interests, pain points...'
  },
  {
    id: 'brandVoice',
    title: 'How would you describe your brand voice?',
    subtitle: 'This helps us match your communication style in all content.',
    type: 'select' as const,
    required: false,
    options: [
      'Professional & Formal',
      'Friendly & Conversational',
      'Expert & Authoritative',
      'Creative & Playful',
      'Caring & Supportive',
      'Bold & Confident',
      'Educational & Helpful',
      'Luxury & Sophisticated'
    ]
  },
  {
    id: 'keywords',
    title: 'What keywords should we focus on?',
    subtitle: 'These will improve your content\'s SEO and search visibility.',
    type: 'tags' as const,
    required: false,
    placeholder: 'Add a keyword and press Enter...'
  },
  {
    id: 'goals',
    title: 'What are your main marketing goals?',
    subtitle: 'Understanding your objectives helps us create more effective content.',
    type: 'checkbox' as const,
    required: false,
    options: [
      'Increase brand awareness',
      'Generate more leads',
      'Drive website traffic',
      'Establish thought leadership',
      'Engage with customers',
      'Promote products/services',
      'Build community',
      'Educate audience'
    ]
  },
  {
    id: 'contentTypes',
    title: 'What types of content interest you most?',
    subtitle: 'We\'ll prioritize these content formats in your automated posts.',
    type: 'checkbox' as const,
    required: false,
    options: [
      'Industry insights & trends',
      'How-to guides & tips',
      'Behind-the-scenes content',
      'Customer success stories',
      'Product/service highlights',
      'Company news & updates',
      'Educational content',
      'Thought leadership pieces'
    ]
  },
  {
    id: 'website',
    title: 'What\'s your website URL?',
    subtitle: 'We\'ll link back to your site in content to drive traffic.',
    type: 'text' as const,
    required: false,
    placeholder: 'https://yourwebsite.com'
  },
  {
    id: 'linkedinProfile',
    title: 'What\'s your LinkedIn profile or company page?',
    subtitle: 'This helps us optimize content for LinkedIn posting.',
    type: 'text' as const,
    required: false,
    placeholder: 'https://linkedin.com/in/yourprofile'
  }
]

function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<OnboardingData>>({
    services: [],
    keywords: [],
    goals: [],
    contentTypes: []
  })

  const currentQuestion = QUESTIONS[currentStep]
  const isLastQuestion = currentStep === QUESTIONS.length - 1
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }))
  }

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(answers as OnboardingData)
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleSkipQuestion = () => {
    if (isLastQuestion) {
      onComplete(answers as OnboardingData)
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const renderInput = () => {
    const value = answers[currentQuestion.id as keyof OnboardingData] || ''

    switch (currentQuestion.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value as string}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
            autoFocus
          />
        )

      case 'textarea':
        return (
          <textarea
            value={value as string}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg resize-none"
            autoFocus
          />
        )

      case 'select':
        return (
          <select
            value={value as string}
            onChange={(e) => handleAnswer(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
            autoFocus
          >
            <option value="">Select an option...</option>
            {currentQuestion.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )

      case 'tags':
        return (
          <TagInput
            value={value as string[]}
            onChange={handleAnswer}
            placeholder={currentQuestion.placeholder || 'Add items...'}
          />
        )

      case 'checkbox':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map(option => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(value as string[])?.includes(option) || false}
                  onChange={(e) => {
                    const currentValues = (value as string[]) || []
                    if (e.target.checked) {
                      handleAnswer([...currentValues, option])
                    } else {
                      handleAnswer(currentValues.filter(v => v !== option))
                    }
                  }}
                  className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="text-lg text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  const isCurrentAnswerValid = () => {
    if (!currentQuestion.required) return true
    
    const answer = answers[currentQuestion.id as keyof OnboardingData]
    if (currentQuestion.type === 'tags' || currentQuestion.type === 'checkbox') {
      return (answer as string[])?.length > 0
    }
    return answer && (answer as string).trim().length > 0
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {currentStep + 1} of {QUESTIONS.length}
          </span>
          <span className="text-sm text-gray-500">
            ~{Math.ceil((QUESTIONS.length - currentStep - 1) * 0.5)} min remaining
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {currentQuestion.title}
            {currentQuestion.required && <span className="text-primary-500 ml-1">*</span>}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {currentQuestion.subtitle}
          </p>
        </div>

        <div className="mb-8">
          {renderInput()}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleSkipQuestion}
            className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
          >
            Skip this question
          </button>
          
          <div className="flex space-x-4">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={currentQuestion.required && !isCurrentAnswerValid()}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentQuestion.required && !isCurrentAnswerValid()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-500 hover:bg-primary-600 text-white'
              }`}
            >
              {isLastQuestion ? 'Complete Setup' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Tag Input Component
function TagInput({ value, onChange, placeholder }: { 
  value: string[], 
  onChange: (tags: string[]) => void,
  placeholder: string 
}) {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()])
      }
      setInputValue('')
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="w-full border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent">
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map(tag => (
          <span
            key={tag}
            className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="text-primary-600 hover:text-primary-800"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : 'Add another...'}
        className="w-full outline-none text-lg"
        autoFocus
      />
    </div>
  )
}

export default OnboardingFlow