import { createContext, useState } from 'react'
import { ImmutableXClient } from '@imtbl/imx-sdk'
import { publicApiUrl } from '../helpers'
import { useAsyncEffect } from 'use-async-effect'

export const ClientContext = createContext<ClientContextTypes>({
  client: null,
})

interface ClientContextTypes {
  client: ImmutableXClient | null
}

export const ClientProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [client, setClient] = useState<ImmutableXClient | null>(null)

  useAsyncEffect(async () => {
    const client = await ImmutableXClient.build({ publicApiUrl });

    setClient(client)
    
    return () => {
      setClient(null)
    }
  }, [])

  const defaultContext = {
    client,
  }

  return (
      <ClientContext.Provider value={defaultContext}>
        {children}
      </ClientContext.Provider>
    )
}