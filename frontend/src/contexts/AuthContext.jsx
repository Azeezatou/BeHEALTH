import { useMemo, useState } from 'react'
import { api } from '../api/client'
import { AuthContext } from './authContext'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('behealth_user')
    return stored ? JSON.parse(stored) : null
  })

  async function signIn(credentials) {
    const data = await api.post('/auth/login', credentials)
    localStorage.setItem('behealth_access_token', data.accessToken)
    localStorage.setItem('behealth_refresh_token', data.refreshToken)
    localStorage.setItem('behealth_user', JSON.stringify(data.user))
    setUser(data.user)
    return data.user
  }

  async function signUp(payload) {
    return api.post('/auth/register', payload)
  }

  function logout() {
    localStorage.removeItem('behealth_access_token')
    localStorage.removeItem('behealth_refresh_token')
    localStorage.removeItem('behealth_user')
    setUser(null)
  }

  const value = useMemo(() => ({ isAuthenticated: Boolean(user), logout, signIn, signUp, user }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
