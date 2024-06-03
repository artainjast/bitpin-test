import { TradeDataType } from "./types";

//we should have type for return type of transformers
export const transformBuyOrSellsData = (data: any) : {result : Array<TradeDataType>}  => {
    const slicedOrders = data?.orders.slice(0, 10); 
    return slicedOrders.map(transformTradeData)
}

const transformTradeData = (data: any) : TradeDataType => {
    return {
        amount: data?.amount,
        price: data?.price,
        remain: data?.remain,
        value: data?.value
    }
}

export const transformRemainData = (data: any) => {    
    return {

    }
}