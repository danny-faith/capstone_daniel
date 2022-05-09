import { ImmutableMethodResults, Link } from '@imtbl/imx-sdk'
import { StandardButton, FlexLayout, ParagraphText, SimpleText } from '@imtbl/design-system'
import { linkAddress, publicApiUrl } from '../helpers'
import React, { useEffect, useState, useCallback, useContext } from 'react'
import useSWR from 'swr'
import { ClientContext } from '../contexts/ClientContext'
import { useLocalStorage } from 'usehooks-ts'
import Order from '../components/Order'
import { useAsyncEffect } from 'use-async-effect'

const link = new Link(linkAddress)

const Assets = () => {
  const [ address ] = useLocalStorage('IMBTL_address', '')
  const { client } = useContext(ClientContext)
  const { data: assets, error, mutate } = useSWR(`${publicApiUrl}/assets?user=${address}`, () => client?.getAssets({ user: address  }))
  
  if (error) throw new Error('Error: Getting assets')

  useAsyncEffect(async () => {
    if (client) {
      const assets = await client.getAssets({ user: address  })

      mutate(assets)
    }
  }, [address, client])

  function handleList(token_id: string, token_address: string) {
    link.sell({
      tokenId: token_id,
      tokenAddress: token_address,
    })
  }

  if (!address) return <ParagraphText>Please connect wallet</ParagraphText>
  if (!assets) return <ParagraphText>Loading</ParagraphText>

  return (
    <div>
      <FlexLayout padding="2vh" justifyContent="center">
        <SimpleText>My assets</SimpleText>
      </FlexLayout>
      <FlexLayout flexDirection="row" flexWrap="wrap" justifyContent="center">
        {(assets) && (assets.result.map((asset) => (
            <FlexLayout key={asset.token_id} flexDirection="column" flexWrap="wrap" justifyContent="center">
              <Order
                assetCollectionName={asset.collection.name}
                assetName={asset.name}
                assetStatusEnum={asset.status}
                assetStatusText={asset.status}
                className="css-lmi9td"
                imgUrl={asset.image_url}
                network="Immutable X"
                testId="mooo"
                key={asset.token_id} 
              />
              <StandardButton buttonKind="ultimate-cta" onClick={() => handleList(asset.token_id, asset.token_address)}>
                  Sell
              </StandardButton>
            </FlexLayout>
          )
        ))}
      </FlexLayout>
    </div>
  )
}

export default Assets
