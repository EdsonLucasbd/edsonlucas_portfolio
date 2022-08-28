import React, { useState } from 'react'
import { Image, ResponsiveImageType } from 'react-datocms'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Fade from 'react-reveal/Fade';
import * as yup from 'yup';
import emailjs from '@emailjs/browser';
import { Loader } from '@components/Loader';


interface IContact {
  logo: ResponsiveImageType
}

export const Contact = ({ logo }: IContact) => {
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = yup.object().shape({
    visitorName: yup.string().min(3, 'Seu nome é maior que isso...').required('Informe seu nome.'),
    visitorEmail: yup.string().email('Informe um email válido.').required('Informe seu email.'),
    phone: yup.string().required('Seu telefone é importante.'),
    message: yup.string().min(10, 'A mensagem deve ter pelo menos 10 caracteres.').required('Qual a sua mensagem?')
  })

  const sendEmail = (object: Record<string, unknown>) => {
    emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, object, process.env.NEXT_PUBLIC_EMAILJS_KEY)
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.error(error.text);
      });
  }

  return (
    <div id='contact' className="flex flex-row justify-center items-center min-h-screen bg-gradientRadial from-comment via-current-line to-background">
      <Fade left>
        <Image data={logo} className="hidden laptop:hidden desktop:block" />
      </Fade>
      <Fade top>
        <Formik initialValues={{
          visitorName: '',
          visitorEmail: '',
          phone: '',
          message: ''
        }}
          validationSchema={formSchema}
          onSubmit={(values, { setSubmitting, resetForm, }) => {
            setIsLoading(true)
            setTimeout(() => {
              sendEmail(values)
              setSubmitting(false)
              setIsLoading(false)
              setSubmitting(false)
              resetForm();
            }, 1500)
          }}>
          {({ isSubmitting, isValid, handleSubmit }) => (
            <Form onSubmit={handleSubmit} className='flex justify-center items-center flex-col relative left-0 laptop:left-[20rem] bottom-8 mobile:bottom-0 mobile:top-0 h-[34rem] mobile:h-[39.625rem] w-[20.5rem] mobile:w-[30.5rem] rounded-[.25rem] bg-current-line shadow-lg'>
              <legend className='font-title text-4xl laptop:text-[3.5rem] top-4 laptop:top-3 absolute'>Entre em contato</legend>

              <div className="form-group">
                <div className="label-float flex flex-col">
                  <Field type="text" name="visitorName" id="visitorName" placeholder=' ' />
                  <label className='font-body'>Seu nome:</label>
                  <span className='text-pink absolute bottom-3 tablet:-bottom-3 mobile:-bottom-1'>
                    <ErrorMessage name="visitorName" />
                  </span>
                </div>
                <div className="label-float flex flex-col">
                  <Field type="email" name="visitorEmail" id="visitorEmail" placeholder=' ' />
                  <label className='font-body'>Seu email:</label>
                  <span className='text-pink absolute bottom-3 tablet:-bottom-3 mobile:-bottom-1'>
                    <ErrorMessage name="visitorEmail" />
                  </span>
                </div>
                <div className="label-float flex flex-col">
                  <Field type="phone" name="phone" id="phone" placeholder=' ' />
                  <label className='font-body'>Seu telefone:</label>
                  <span className='text-pink absolute bottom-3 tablet:-bottom-3 mobile:-bottom-1'>
                    <ErrorMessage name="phone" />
                  </span>
                </div>
                <div className="label-float flex flex-col grow-wrap">
                  <Field
                    className="scrollbar-track-background-500 scrollbar-thumb-purple scrollbar-thin"
                    as='textarea'
                    name="message"
                    id="message"
                    placeholder=' '
                    rows={4}
                    cols={30}
                    wrap="hard"
                  />
                  <label className='font-body'>Sua mensagem:</label>
                  <span className='text-pink absolute bottom-3 tablet:-bottom-3 mobile:-bottom-1'>
                    <ErrorMessage name="message" />
                  </span>
                </div>
              </div>
              <button
                type='submit'
                className='absolute w-48 tablet:w-56 h-[3.8125rem] rounded-md top-[29.5rem] laptop:top-[34rem] 
                  tablet:top-[34.5rem] mobile:top-[33rem] flex justify-center items-center
                  bg-comment text-xl tablet:text-2xl font-body shadow-md 
                  disabled:bg-background disabled:opacity-50 
                  disabled:cursor-not-allowed transition-all duration-300
                  hover:brightness-110'
                disabled={!isValid && !isSubmitting}
              >
                {isLoading ? <Loader size={24} /> : `Enviar mensagem`}
              </button>
            </Form>
          )}
        </Formik>
      </Fade>

    </div>
  )
}
