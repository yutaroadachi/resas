import { PropsWithChildren, ReactNode } from "react"
import classes from "./Layout.module.css"

export type LayoutProps = PropsWithChildren<unknown>

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <header className={classes.header}>
        <h1>総人口推移グラフ</h1>
      </header>
      <main className={classes.main}>
        <div className={classes.container}>{children}</div>
      </main>
      <footer className={classes.footer}>
        Copyright© adachi All Rights Reserved.
      </footer>
    </div>
  )
}

export const getLayout = (page: ReactNode): ReactNode => {
  return <Layout>{page}</Layout>
}
