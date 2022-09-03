import React, { useEffect, useState } from 'react'
import { FaAngleUp } from 'react-icons/fa'

export const BackToTopButton = () => {
  const [showTopBtn, setShowTopBtn] = useState(false)

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
            rounded-[50%] h-8 w-8 mobile:h-12 mobile:w-12 text-foreground 
            cursor-pointer transition-all ease-in-out animate-bounce'
          onClick={goToTop}
          aria-label='Voltar para o início do portfólio.'
        />
      )}
    </div>
  )
}