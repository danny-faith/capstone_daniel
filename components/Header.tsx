import Link from 'next/link'
import { Link as IMTBLLink } from '@imtbl/imx-sdk'
import { linkAddress } from '../helpers'
import { StandardButton, FlexLayout, SectionHeading, Box } from '@imtbl/design-system'
import { useLocalStorage } from 'usehooks-ts'

const link = new IMTBLLink(linkAddress)

const Header = () => {
  const [wallet, setWallet] = useLocalStorage('IMBTL_address', '')

  const handleConnect = async () => {
      const { address } = await link.setup({})

      setWallet(address)  
  }

  const handleHistory = () => {
    link.history({})
  }

  return (
    <div>
      <Box padding="2vw">
        <FlexLayout justifyContent="center">
          <SectionHeading textAlign="center">
            Capstone
          </SectionHeading>
        </FlexLayout>
        <Box padding="2vw">
          <FlexLayout justifyContent="center">
            <Box padding="1vw">
              <StandardButton disabled={!!wallet} onClick={handleConnect}>
                {(!wallet) ? 'Connect wallet' : 'Wallet connected'}
              </StandardButton>
            </Box>
            <Box padding="1vw">
              <StandardButton onClick={handleHistory}>
                History
              </StandardButton>
            </Box>
          </FlexLayout>
        </Box>
      </Box>
      <FlexLayout className="navbar" justifyContent="center">
        <Box padding="1vw">
          <Link href="/">
            <StandardButton>
                Orders
            </StandardButton>
          </ Link>
        </Box>
        <Box padding="1vw">
          <Link href="/assets">
            <StandardButton>
              Assets
            </StandardButton>
          </Link>
        </Box>
        <Box padding="1vw">
          <Link href="/wallet-management">
            <StandardButton>
              Wallet management
            </StandardButton>
          </Link>
        </Box>
      </FlexLayout>
    </div>
  )
}

export default Header
