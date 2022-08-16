import React from 'react'

export const Contact = () => {
  return (
    <div id='contact' className="flex flex-col justify-center items-center min-h-screen bg-gradientRadial from-comment via-current-line to-background">
      <form action="" className='flex justify-center items-center flex-col relative left-[25rem] top-0 h-[39.625rem] w-[30.5rem] rounded-[.25rem] bg-current-line shadow-lg'>
        <legend className='font-title text-[3.5rem] top-0 absolute'>Entre em contato</legend>

        <div className="label-float">
          <input type="text" name="name" id="name" />
          <label htmlFor="name">Seu nome:</label>
        </div>
        <div className="label-float">
          <input type="email" name="email" id="email" />
          <label htmlFor="email">Seu email</label>
        </div>
      </form>
    </div>
  )
}
