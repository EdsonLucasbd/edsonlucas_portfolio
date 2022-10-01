import React, { useState } from 'react'
import { Image, ResponsiveImageType } from 'react-datocms'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Fade from 'react-reveal/Fade';
import * as yup from 'yup';
import emailjs from '@emailjs/browser';
import { Loader } from '@components/Loader';
import { useRouter } from 'next/router';
import i18n from '@lib/i18n';


interface IContact {
  logo: ResponsiveImageType
}

export const Contact = ({ logo }: IContact) => {
  const [isLoading, setIsLoading] = useState(false)
  const { locale } = useRouter()

  let LocaleType: {
    en: string,
    'pt-BR': string
  }

  const currentLocale = locale as keyof typeof LocaleType

  const phoneRegexExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/

  const formSchema = yup.object().shape({
    visitorName: yup.string()
      .min(3, `${i18n.form.nameIsShortError[currentLocale]}`)
      .required(`${i18n.form.nameLabelError[currentLocale]}`),
    visitorEmail: yup.string().email(`${i18n.form.emailLabelError[currentLocale]}`),
    phone: yup.string()
      .matches(phoneRegexExp, `${i18n.form.phoneIsShortError[currentLocale]}`)
      .required(`${i18n.form.phoneLabelError[currentLocale]}`),
    message: yup.string()
      .min(10, `${i18n.form.messageIsShortError[currentLocale]}`)
      .required(`${i18n.form.messageLabelError[currentLocale]}`)
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
        <Image data={logo} className="hidden laptop:hidden desktop:block" aria-hidden="true" />
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
            <Form onSubmit={handleSubmit} className='flex justify-center items-center flex-col relative left-0 laptop:left-[20rem] bottom-8 sm:bottom-0 sm:top-0 h-[34rem] sm:h-[39.625rem] w-[20.5rem] sm:w-[30.5rem] rounded-[.25rem] bg-current-line shadow-lg'>
              <legend className='font-title text-4xl laptop:text-[3.5rem] top-4 laptop:top-3 absolute'>{i18n.form.title[currentLocale!]}</legend>

              <div className="form-group">
                <div className="label-float flex flex-col">
                  <Field type="text" name="visitorName" id="visitorName" placeholder=' '
                  // aria-labelledby="nameLabel" 
                  />
                  <label className='font-body' id='nameLabel'>{i18n.form.nameLabel[currentLocale]}</label>
                  <span className='text-pink absolute bottom-3 tablet:-bottom-3 sm:-bottom-1' aria-live='polite'>
                    <ErrorMessage name="visitorName" />
                  </span>
                </div>
                <div className="label-float flex flex-col">
                  <Field type="email" name="visitorEmail" id="visitorEmail" placeholder=' '
                    aria-labelledby="mailLabel"
                  />
                  <label className='font-body' id='mailLabel'>{i18n.form.emailLabel[currentLocale]} <em className='text-sm not-italic text-foreground-900'>{i18n.form.emailLabel.optional[currentLocale]}</em></label>
                  <span className='text-pink absolute bottom-3 tablet:-bottom-3 sm:-bottom-1' aria-live='polite'>
                    <ErrorMessage name="visitorEmail" />
                  </span>
                </div>
                <div className="label-float flex flex-col">
                  <Field type="phone" name="phone" id="phone" placeholder=' '
                    aria-labelledby="phoneLabel"
                  />
                  <label className='font-body' id='phoneLabel'>{i18n.form.phoneLabel[currentLocale]}</label>
                  <span className='text-pink absolute bottom-3 tablet:-bottom-3 sm:-bottom-1' aria-live='polite'>
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
                    aria-labelledby="messageLabel"
                  />
                  <label className='font-body' id='messageLabel'>{i18n.form.messageLabel[currentLocale]}</label>
                  <span className='text-pink absolute bottom-3 tablet:-bottom-3 sm:-bottom-1' aria-live='polite'>
                    <ErrorMessage name="message" />
                  </span>
                </div>
              </div>
              <button
                type='submit'
                className='absolute w-48 tablet:w-56 h-[3.8125rem] rounded-md top-[29.5rem] laptop:top-[34rem] 
                  tablet:top-[34.5rem] sm:top-[33rem] flex justify-center items-center
                  bg-comment text-xl tablet:text-2xl font-body shadow-md 
                  disabled:bg-background disabled:opacity-50 
                  disabled:cursor-not-allowed transition-all duration-300
                  hover:brightness-110'
                disabled={!isValid && !isSubmitting}
              >
                {isLoading ? <Loader size={24} /> : `${i18n.form.sendMessageButton[currentLocale]}`}
              </button>
            </Form>
          )}
        </Formik>
      </Fade>
    </div>
  )
}
