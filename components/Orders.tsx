import { ImmutableXClient, ImmutableMethodResults, Link, ETHTokenType } from '@imtbl/imx-sdk';
import { linkAddress } from '../helpers'
import { StandardButton, FlexLayout, SimpleText } from '@imtbl/design-system'
import Order from '../components/Order'

const link = new Link(linkAddress);

interface OrdersProps {
    orders?: ImmutableMethodResults.ImmutableGetOrdersResult,
    error: any,
}

const Orders = ({ orders, error }: OrdersProps) => {

  function handleBuy(order_id: any) {
    link.buy({
      orderIds: [order_id]
    })
  }

  if (error) return <p>Error</p>
  if (!orders) return <p>Loading</p>

  return (
    <div>
      <FlexLayout padding="2vh" justifyContent="center">
        <SimpleText>Orders</SimpleText>
      </FlexLayout>
      <FlexLayout flexDirection="row" flexWrap="wrap" justifyContent="center">
        {(orders) && (orders.result.map((order) => (
            <FlexLayout key={order.order_id} flexDirection="column" flexWrap="wrap" justifyContent="center">
              <Order 
                assetCollectionName={order?.sell?.data?.properties?.collection.name || order?.buy?.data?.properties?.collection.name}
                assetName={order?.sell?.data?.properties?.name || order?.buy?.data?.properties?.name}
                assetStatusEnum={order.status}
                assetStatusText={order.status}
                className="css-lmi9td"
                imgUrl={order?.sell?.data?.properties?.image_url || order?.buy?.data?.properties?.image_url}
                network="Immutable X"
                testId="mooo"
              />
              <StandardButton disabled={(order.status !== 'active')} buttonKind="ultimate-cta" onClick={() => handleBuy(order.order_id)}>
                Buy
              </StandardButton>
            </FlexLayout>
          )
        ))}
      </FlexLayout>
    </div>
  )
}

export default Orders
