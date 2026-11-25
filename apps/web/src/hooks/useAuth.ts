'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, loginUser, logoutUser, refreshAuth, registerUser } from '@/api/auth.api'
import {
  setToken,
  removeToken,
  setUser,
  removeUser,
  getUser,
  getToken,
} from '@/lib/auth'
import type { LoginPayload, RegisterPayload, User } from '@/types/auth.types'

let initializationPromise: Promise<User | null> | null = null

function initializeAuth(): Promise<User | null> {
  if (!initializationPromise) {
    initializationPromise = (async () => {
      try {
        let token = getToken()
        if (!token) {
          token = (await refreshAuth()).accessToken
          setToken(token)
        }
        try {
          return (await getCurrentUser(token)).user
        } catch {
          token = (await refreshAuth()).accessToken
          setToken(token)
          return (await getCurrentUser(token)).user
        }
      } catch {
        removeToken()
        removeUser()
        return null
      }
    })()
  }
  return initializationPromise
}

export function useAuth() {
  const router = useRouter()
  const [user, setUserState] = useState<User | null>(() => getUser() ?? null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load user from cookie on mount
  useEffect(() => {
    let active = true
    initializeAuth().then((currentUser) => {
      if (active) {
        if (currentUser) setUser(currentUser)
        else removeUser()
        setUserState(currentUser)
        if (active) setIsInitializing(false)
      }
    })
    return () => { active = false }
  }, [])

  const login = async (payload: LoginPayload) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await loginUser(payload)
      const { accessToken, user } = response
      setToken(accessToken)
      setUser(user)
      setUserState(user)
      initializationPromise = Promise.resolve(user)
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
      const { accessToken, user } = response
      setToken(accessToken)
      setUser(user)
      setUserState(user)
      initializationPromise = Promise.resolve(user)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await logoutUser()
    } catch {
      // Clear local auth state even if the refresh cookie has already expired.
    } finally {
      removeToken()
      removeUser()
      setUserState(null)
      initializationPromise = Promise.resolve(null)
      router.push('/login')
    }
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
