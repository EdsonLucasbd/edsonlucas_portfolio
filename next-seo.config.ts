import { DefaultSeoProps } from 'next-seo'

const config: DefaultSeoProps = {
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://edsonlucas.vercel.app/',
    siteName: 'Edson Lucas | Front End',
    description: 'Este é o meu portfólio, aqui poderá encontrar alguns dos meus projetos, redes sociais e entrar em contato comigo.'
  },
  twitter: {
    handle: '@EdLucaas',
    site: '@site',
    cardType: 'summary_large_image'
  }
}

export default config
