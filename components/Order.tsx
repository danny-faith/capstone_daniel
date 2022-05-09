import { ImmutableXClient, ImmutableMethodResults, Link, ETHTokenType } from '@imtbl/imx-sdk';
// import { ImxAssetTilePropTypes } from '@imtbl/imx-sdk/dist/src/types';
import { StandardButton, FlexLayout, SectionHeading, Box, ParagraphText, ImxAssetTile } from '@imtbl/design-system'

interface OrderProps {
    assetCollectionName: string,
    assetName: string,
    assetStatusEnum: any,
    assetStatusText: any,
    className: string,
    imgUrl: any,
    network: string,
    testId: string,
}

// ImmutableMethodResults.ImmutableGetOrderResult

const Order = ({ 
    assetCollectionName,
    assetName,
    assetStatusEnum,
    assetStatusText,
    className,
    imgUrl = '',
    network = '',
    testId }: OrderProps ) => {
    // const imgUrl = order?.sell?.data?.properties?.image_url || order?.buy?.data?.properties?.image_url

    return (
        <Box backgroundColor="#ccc" width="20vw" padding="1vw">
            <ImxAssetTile
                assetCollectionName={assetCollectionName}
                assetName={assetName}
                assetStatusEnum={assetStatusEnum}
                assetStatusText={assetStatusText}
                className="css-lmi9td"
                imgUrl={imgUrl}
                network={network}
                testId="mooo"
            />
        </Box>
    )
}

export default Order
