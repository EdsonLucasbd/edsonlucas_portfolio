import React from 'react'
import { Image, ResponsiveImageType } from 'react-datocms'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Fade from 'react-reveal/Fade';
import * as yup from 'yup';


interface IContact {
  logo: ResponsiveImageType
}

export const Contact = ({ logo }: IContact) => {
  const formSchema = yup.object().shape({
    name: yup.string().min(3, 'Seu nome é maior que isso...').required('Informe seu nome.'),
    email: yup.string().email('Informe um email válido.').required('Informe seu email.'),
    phone: yup.string().required('É importante informar um telefone para contato.'),
    message: yup.string().required('Qual a sua mensagem?')
  })

  return (
    <div id='contact' className="flex flex-row justify-center items-center min-h-screen bg-gradientRadial from-comment via-current-line to-background">
      <Fade left>
        <Image data={logo} />
      </Fade>
      <Fade top>
        <Formik initialValues={{
          name: '',
          email: '',
          phone: '',
          message: ''
        }}
          validationSchema={formSchema}
          onSubmit={(values, { setSubmitting, resetForm, }) => {
            setTimeout(() => {
              // sendEmail(values)
              console.log("submit", values);
              setSubmitting(false)
            }, 1000)
            resetForm();
            // setIsOpen(true)
          }}>
          <Form className='flex justify-center items-center flex-col relative left-[20rem] top-0 h-[39.625rem] w-[30.5rem] rounded-[.25rem] bg-current-line shadow-lg'>
            <legend className='font-title text-[3.5rem] top-0 absolute'>Entre em contato</legend>

            <div className="form-group">
              <div className="label-float flex flex-col">
                <Field type="text" name="name" id="name" placeholder=' ' />
                <label className='font-body'>Seu nome:</label>
                <span className='text-pink absolute -bottom-1'>
                  <ErrorMessage name="name" />
                </span>
              </div>
              <div className="label-float flex flex-col">
                <Field type="email" name="email" id="email" placeholder=' ' />
                <label className='font-body'>Seu email</label>
                <span className='text-pink absolute -bottom-1'>
                  <ErrorMessage name="email" />
                </span>
              </div>
              <div className="label-float flex flex-col">
                <Field type="phone" name="phone" id="phone" placeholder=' ' />
                <label className='font-body'>Seu telefone:</label>
                <span className='text-pink absolute -bottom-1'>
                  <ErrorMessage name="phone" />
                </span>
              </div>
              <div className="label-float flex flex-col">
                <Field as='textarea' name="message" id="message" placeholder=' ' rows={4} cols={30} wrap="hard" />
                <label className='font-body'>Sua mensagem:</label>
                <span className='text-pink absolute -bottom-1'>
                  <ErrorMessage name="message" />
                </span>
              </div>
            </div>
            <button type='button' className='absolute w-56 h-[3.8125rem] rounded-md top-[34rem] bg-comment text-2xl font-body shadow-md disabled:bg-background disabled:opacity-50 disabled:cursor-not-allowed' disabled>Enviar mensagem</button>
          </Form>
        </Formik>
      </Fade>

    </div>
  )
}
