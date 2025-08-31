import { auth } from '../firebase'

const API_BASE_URL = 'http://localhost:5001/api'

class ApiService {
  private async getAuthToken(): Promise<string | null> {
    const user = auth.currentUser
    if (!user) return null
    
    try {
      return await user.getIdToken()
    } catch (error) {
      console.error('Failed to get auth token:', error)
      return null
    }
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const token = await this.getAuthToken()
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }))
      throw new Error(error.message || `HTTP ${response.status}`)
    }

    return response.json()
  }

  // User/Auth endpoints
  async getCurrentUser() {
    return this.makeRequest('/auth/profile')
  }

  // Client endpoints
  async getClients() {
    return this.makeRequest('/clients')
  }

  async createClient(clientData: any) {
    return this.makeRequest('/clients', {
      method: 'POST',
      body: JSON.stringify(clientData),
    })
  }

  async getClient(id: string) {
    return this.makeRequest(`/clients/${id}`)
  }

  async updateClient(id: string, clientData: any) {
    return this.makeRequest(`/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(clientData),
    })
  }

  // Content endpoints
  async getContent() {
    return this.makeRequest('/content')
  }

  async createContent(contentData: any) {
    return this.makeRequest('/content/generate', {
      method: 'POST',
      body: JSON.stringify(contentData),
    })
  }

  async getContentById(id: string) {
    return this.makeRequest(`/content/${id}`)
  }

  async updateContent(id: string, contentData: any) {
    return this.makeRequest(`/content/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contentData),
    })
  }

  // Analytics endpoints
  async getAnalyticsOverview() {
    return this.makeRequest('/analytics/overview')
  }

  async getPerformanceAnalytics() {
    return this.makeRequest('/analytics/performance')
  }

  async getSystemAnalytics() {
    return this.makeRequest('/analytics/system')
  }
}

export const apiService = new ApiService()
export default apiService