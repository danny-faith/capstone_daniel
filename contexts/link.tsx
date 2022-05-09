import { ImmutableXClient } from '@imtbl/imx-sdk'
import { createContext, useContext, useMemo } from 'react'
import { linkAddress } from '../helpers'

export const ClientContext = createContext({})
ClientContext.displayName = 'ClientContext'

export function ClientProvider({ children }: React.PropsWithChildren<{}>) {

    const imxClient: ImmutableXClient = useMemo(
        () =>
          new ImmutableXClient(
            linkAddress,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
          ),
        [],
      )

      return (
        <ClientContext.Provider value={imxClient} >
          {children}
        </ClientContext.Provider>
      )
}

export function useClient() {
    const context = useContext(ClientContext)
  
    if (context === undefined) {
      throw new Error('useImxLink must be used within a ImxLinkProvider')
    }
  
    return context
}