import { publicApiUrl } from '../helpers'
import { ImmutableMethodResults } from '@imtbl/imx-sdk'
import { StandardButton, Box } from '@imtbl/design-system'
import React, { useEffect, useState, useContext } from 'react';
import { SyntheticEvent } from 'react'
import useSWR from 'swr'
import { ClientContext } from '../contexts/ClientContext'
import Orders from '../components/Orders';
import useAsyncEffect from 'use-async-effect';
import { useLocalStorage } from 'usehooks-ts';

const Home = () => {
  const { client } = useContext(ClientContext)
  const [ address ] = useLocalStorage('IMBTL_address', '')
  const [params, setParams] = useState({})
  const { data: orders, error, mutate } = useSWR<ImmutableMethodResults.ImmutableGetOrdersResult>(`${publicApiUrl}/orders`, () => client?.getOrders(params))

  useAsyncEffect(async () => {
    if (client) {
      const orders = await client.getOrders({ user: address  })

      mutate(orders)
    }
  }, [address, client])

  useEffect(() => {
    return function cleanUp() {
      mutate(undefined)
    }
  }, [mutate])

  async function handleSearch(e: SyntheticEvent) {
    if (client !== null) {
      const newParams = {
        sell_metadata:'{"mana":["4"]}',
      }
      try {
        const orders = await client.getOrders(newParams)

        setParams(newParams)
        mutate(orders)
      } catch(error) {
        throw new Error(`Error: Getting list balances - ${error}`)
      }
    }
  }

  return (
    <Box padding="2vw">
      <StandardButton testId="search-button" onClick={handleSearch}>
        Search for Mana 4
      </StandardButton>
      <Orders orders={orders} error={error} />
    </Box>
  )
}

export default Home
