import "@/styles/global.css"
import { NextPage } from "next"
import { AppProps } from "next/app"
import { ReactNode } from "react"
import "sanitize.css"

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function _App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(<Component {...pageProps} />)
}
