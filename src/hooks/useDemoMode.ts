import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export function useDemoMode() {
  const location = useLocation()
  const [isDemo, setIsDemo] = useState(false)

  useEffect(() => {
    setIsDemo(localStorage.getItem('demoMode') === 'true')
  }, [location.pathname])

  const exitDemo = () => {
    localStorage.removeItem('demoMode')
    window.location.href = '/login'
  }

  return { isDemo, exitDemo, pathname: location.pathname }
}

