import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/user-store'
import { useGetMe } from '../queries/hooks/user'
import { LOCAL_STORAGE } from '../constants/local-storage'

export const useAuthGuard = () => {
  const [isChecking, setIsChecking] = useState(true)

  const navigate = useNavigate()

  const user = useUserStore((s) => s.user)
  const setUser = useUserStore((s) => s.setUser)
  const clearUser = useUserStore((s) => s.clearUser)

  const { mutate: getMe } = useGetMe()

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)

    if (!token) {
      clearUser?.()
      setIsChecking(false)
      navigate('/login')
      return
    }
    if (user) {
      setIsChecking(false)
      return
    }

    getMe(undefined, {
      onSuccess: (data) => {
        setUser(data)
        setIsChecking(false)
      },
      onError: (err) => {
        console.log('Auth guard: failed to fetch user', err)
        localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN)
        clearUser?.()
        setIsChecking(false)
        navigate('/login')
      },
    })
  }, [user, getMe, setUser, clearUser, navigate])

  return {
    isChecking,
    isAuthenticated: !!user,
  }
}
