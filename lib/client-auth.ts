"use client"

import { useEffect, useState } from 'react'

export interface User {
  _id: string
  name: string
  email: string
}

export async function getClientUser(): Promise<User | null> {
  try {
    const response = await fetch('/api/auth')
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const fetchUser = async () => {
      try {
        const userData = await getClientUser()
        if (mounted) {
          setUser(userData)
          setError(null)
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to fetch user data')
          setUser(null)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchUser()

    return () => {
      mounted = false
    }
  }, [])

  return { user, loading, error }
}