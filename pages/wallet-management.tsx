import { Link, ETHTokenType } from '@imtbl/imx-sdk'
import { formatUnits } from '@ethersproject/units';
import { publicApiUrl, linkAddress } from '../helpers'
import { useLocalStorage } from 'usehooks-ts'
import useSWR from 'swr'
import { StandardButton, FlexLayout, Box, SimpleText, NumberPrettyInput } from '@imtbl/design-system'
import { useState, useContext, useEffect } from 'react'
import { ClientContext } from '../contexts/ClientContext'
import BigNumber from 'bignumber.js'
import { useAsyncEffect } from 'use-async-effect'

const link = new Link(linkAddress)

const WalletManagment = () => {
  const [ address ] = useLocalStorage('IMBTL_address', '')
  const [ amount, setAmount ] = useState<string |  null>(null)
  const { client } = useContext(ClientContext)
  const { data, error, mutate } = useSWR(`${publicApiUrl}/v2/balances/0x62e634a529e8bc5d2b49e58d77b0a9d7fdea7284`, () => client?.listBalances({ user: address }))

  if (error) console.log('Error: Getting list balances - ', error)

  useEffect(() => {
    return function cleanUp() {
      mutate(undefined)
    }
  }, [mutate])
  
  useAsyncEffect(async () => {
    if (client) {
      try {
        const balances = await client.listBalances({ user: address });

        if (balances) {
          mutate(balances)
        }

      } catch(error) {
        console.log('Error: Getting list balances - ', error)
      }
    }
  }, [client])
  
  function handleSubmit(type: string) {
    if (amount === null) return

    switch (type) {
      case 'deposit':
        deposit(amount)
        break;
      case 'withdrawel':
        withdrawel(amount)
        break;
    
      default:
        break;
    }
  }

  function deposit(amount: string) {
    link.deposit({
      type: ETHTokenType.ETH,
      amount,
    })
  }

  function withdrawel(amount: string) {
    link.prepareWithdrawal({
      type: ETHTokenType.ETH,
      amount,
    })
  }

  function handleOnChange(value: BigNumber) {
    const amount = (value.isNaN())
      ? null
      : value.toString() 

    setAmount(amount)
  }

  function handleCompleteWithdraw() {
    link.completeWithdrawal({
      type: ETHTokenType.ETH,
    })
  }

  if (!address) return 'Please connect wallet'

  return (
    <div>
        <Box>
          <FlexLayout padding="2vh" justifyContent="center">
            <SimpleText>Wallet management</SimpleText>
          </FlexLayout>
          <FlexLayout padding="2vh" justifyContent="center">
            <SimpleText>Withdraw or deposit from your wallet</SimpleText>
          </FlexLayout>
          <FlexLayout padding="2vh" justifyContent="center">
            <NumberPrettyInput
              centeredAndLarge
              inputId="moo-cow"
              labelText="amount"
              testId="mooo"
              onChange={handleOnChange}
            />
          </FlexLayout>
          <FlexLayout justifyContent="center">
            <Box padding="1vw">
              <StandardButton disabled={!amount} onClick={() => handleSubmit('deposit')}>
                Deposit
              </StandardButton>
            </Box>
            <Box padding="1vw">
              <StandardButton disabled={!amount} onClick={() => handleSubmit('withdrawel')}>
                Withdraw
              </StandardButton>
            </Box>
          </FlexLayout>
          {(data) && (
            <FlexLayout justifyContent="center">
              <Box padding="1vw">
                <SimpleText>
                  Withdrawels
                </SimpleText>
                {
                  // happy using index for a key here as the order of these elements is not going to change
                }
                {data.result.map((obj, index) => (
                  <Box padding="1vw" key={index}>
                    <StandardButton onClick={handleCompleteWithdraw}>
                      {formatUnits(obj.withdrawable)} {obj.symbol}
                    </StandardButton>
                  </Box>
                ))}
              </Box>
            </FlexLayout>
          )}
        </Box>
    </div>
  )
}

export default WalletManagment
