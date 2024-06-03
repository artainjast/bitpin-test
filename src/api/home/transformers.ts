//FYI : We can use Generator to slice data to have better performance and cpu usage 
// Already it's not working correctly

import { MARKET_CODES } from "../../constants/marketCodes";

// function* dataGenerator(results: Array<object>) {

//     let index = 0;
//     const batchSize = 20;

//     while (index < results.length) {
//         yield results.slice(index, index + batchSize);
//         index += batchSize;
//     }
// }

// export const transformHomePageData = (data: any) => {
//     const generator = dataGenerator(data.results);
//     const chunks: Array<Array<object>> = [];

//     for (let chunk of generator) {
//         chunks.push(chunk);
//     }
//     console.log({
//         next: data?.next,
//         previous: data?.previous,
//         count: data?.count,
//         chunks: chunks 
//     });
    
//     return {
//         next: data?.next,
//         previous: data?.previous,
//         count: data?.count,
//         chunks: chunks 
//     };
// };

export const transformHomePageData = (data: any) => {
    return {
        next: data?.next,
        previous: data?.previous,
        count: data?.count,
        results: {
            IRT: transformIRTData(data?.results),
            USDT : transformTETHERData(data?.results)
        } 
    };
};


export const transformIRTData = (data: any) => {
    return data?.filter(
        (item :  {currency2 : { code : string}}) => item.currency2.code === MARKET_CODES.IRT
    );
} 

export const transformTETHERData = (data: any) => {
    return data?.filter(
        (item : {currency2 : { code : string}}) => item.currency2.code === MARKET_CODES.USDT
    );
}