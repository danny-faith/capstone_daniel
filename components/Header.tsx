import type { NextPage } from 'next'
import Link from 'next/link'
import { StandardButton, FlexLayout, SectionHeading, Box } from '@imtbl/design-system'

const Header: NextPage = () => {
  return (
    <div>
      <Box padding="2vw">
        <SectionHeading textAlign="center">
          Capstone
        </SectionHeading>
      </Box>
      <FlexLayout justifyContent="center">
        <Link href="/">
          <StandardButton>
              Orders
          </StandardButton>
        </ Link>
        <Link href="/assets">
          <StandardButton>
            Assets
          </StandardButton>
        </Link>
        <Link href="/inventory">
          <StandardButton>
            Inventory
          </StandardButton>
        </Link>
      </FlexLayout>
    </div>
  )
}

export default Header
