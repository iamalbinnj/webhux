'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loginUser, registerUser } from '@/api/auth.api'
import {
  setToken,
  removeToken,
  setUser,
  removeUser,
  getUser,
  getToken,
} from '@/lib/auth'
import type { LoginPayload, RegisterPayload, User } from '@/types/auth.types'

export function useAuth() {
  const router = useRouter()
  const [user, setUserState] = useState<User | null>(() => getUser() ?? null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load user from cookie on mount
  useEffect(() => {
    // user is initialized lazily from getUser to avoid synchronous setState in effect
    setIsInitializing(false)
  }, [])

  const login = async (payload: LoginPayload) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await loginUser(payload)
      const { token, session, user } = response.data
      setToken(token ?? session?.token ?? 'authenticated')
      setUser(user)
      setUserState(user)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (payload: RegisterPayload) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await registerUser(payload)
      const { token, session, user } = response.data
      setToken(token ?? session?.token ?? 'authenticated')
      setUser(user)
      setUserState(user)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    removeToken()
    removeUser()
    setUserState(null)
    router.push('/login')
  }

  const checkIsLoggedIn = (): boolean => {
    const token = getToken()
    const savedUser = getUser()
    return !!(token && savedUser)
  }

  return {
    user,
    isLoggedIn: !!user,
    isInitializing,
    isLoading,
    error,
    login,
    register,
    logout,
    checkIsLoggedIn,
  }
}
