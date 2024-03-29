import i18n from '@lib/i18n'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaAngleUp } from 'react-icons/fa'

export const BackToTopButton = () => {
  const [showTopBtn, setShowTopBtn] = useState(false)
  const { locale } = useRouter()

  let LocaleType: {
    en: string,
    'pt-BR': string
  }

  const currentLocale = locale as keyof typeof LocaleType

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true)
      } else {
        setShowTopBtn(false)
      }
    })
  }, [])

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className='relative'>
      {showTopBtn && (
        <FaAngleUp
          className='fixed bottom-10 right-6 z-20 opacity-50 hover:opacity-100 
            hover:text-purple bg-opacity-0 border-solid border-[.125rem] 
            rounded-[50%] h-8 w-8 sm:h-12 sm:w-12 text-foreground 
            cursor-pointer transition-all ease-in-out'
          onClick={goToTop}
          aria-label={`${i18n['scroll-top'][currentLocale]}`}
          role="button"
        />
      )}
    </div>
  )
}