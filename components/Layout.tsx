import type { NextPage } from 'next'
import Header from './Header'

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default Layout
