import { useState, useEffect, useCallback, useRef } from 'react'

interface UseMenuProps {
  isOpen: boolean
  onToggle: () => void
}

interface UseMenuReturn {
  isMobile: boolean
  contactOpen: boolean
  setContactOpen: (open: boolean) => void
  handleContactClick: () => void
}

export function useMenu({ isOpen, onToggle }: UseMenuProps): UseMenuReturn {
  const [contactOpen, setContactOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1010)
  const scrollPositionRef = useRef(0)

  const lockScroll = useCallback(() => {
    scrollPositionRef.current = window.pageYOffset
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPositionRef.current}px`
    document.body.style.width = '100%'
  }, [])

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    window.scrollTo(0, scrollPositionRef.current)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-active', isOpen)
    document.body.classList.toggle('menu-hidden', !isOpen)

    if (isMobile) {
      isOpen ? lockScroll() : unlockScroll()
    }
  }, [isOpen, isMobile, lockScroll, unlockScroll])

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    const handleResize = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        const wasMobile = isMobile
        const nowMobile = window.innerWidth <= 1010
        setIsMobile(nowMobile)

        if (nowMobile && isOpen && !wasMobile) lockScroll()
        else if (!nowMobile && isOpen && wasMobile) unlockScroll()
      }, 100)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeout)
    }
  }, [isMobile, isOpen, lockScroll, unlockScroll])

  const handleContactClick = () => {
    if (isOpen) onToggle()
    setContactOpen(true)
  }

  return {
    isMobile,
    contactOpen,
    setContactOpen,
    handleContactClick,
  }
}