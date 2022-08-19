import React from 'react'
import { Image, ResponsiveImageType } from 'react-datocms'

interface IContact {
  logo: ResponsiveImageType
}

export const Contact = ({ logo }: IContact) => {
  return (
    <div id='contact' className="flex flex-row justify-center items-center min-h-screen bg-gradientRadial from-comment via-current-line to-background">
      <Image data={logo} />
      <form action="" className='flex justify-center items-center flex-col relative left-[20rem] top-0 h-[39.625rem] w-[30.5rem] rounded-[.25rem] bg-current-line shadow-lg'>
        <legend className='font-title text-[3.5rem] top-0 absolute'>Entre em contato</legend>

        <div className="form-group">
          <div className="label-float">
            <input type="text" name="name" id="name" placeholder=' ' />
            <label className='font-body'>Seu nome:</label>
          </div>
          <div className="label-float">
            <input type="email" name="email" id="email" placeholder=' ' />
            <label className='font-body'>Seu email</label>
          </div>
          <div className="label-float">
            <input type="phone" name="phone" id="phone" placeholder=' ' />
            <label className='font-body'>Seu telefone:</label>
          </div>
          <div className="label-float">
            <textarea name="message" id="message" placeholder=' ' rows={4} cols={30} wrap="hard" />
            <label className='font-body'>Sua mensagem:</label>
          </div>
        </div>
        <button type='button' className='absolute w-56 h-[3.8125rem] rounded-md top-[34rem] bg-comment text-2xl font-body shadow-md'>Enviar mensagem</button>
      </form>
    </div>
  )
}
