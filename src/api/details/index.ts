import { getRequest } from "../../services/serviceLayer";
import { TRADE_DETAILS_DATA_EP , REMAIN_DETAILS_DATA_EP } from "./endpoints";
import { transformBuyOrSellsData, transformRemainData } from "./transformers";


export function getRemainTradeData(marketId : string | undefined) {
    return getRequest({
        url : REMAIN_DETAILS_DATA_EP(marketId)
    }).then(transformRemainData)
}

export function getBuyOrSellData({ type ,  marketId }: { type: 'buy' | 'sell' | 'transactions'  , marketId : string | undefined}) {
    if (type === 'transactions') {
        return getRemainTradeData(marketId)
    }
    return getRequest({
        url : TRADE_DETAILS_DATA_EP(type , marketId)
    }).then(transformBuyOrSellsData)
}
