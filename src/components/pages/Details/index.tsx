import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAPI from "../../../hooks/useApi";
import { getBuyOrSellData } from "../../../api/details";
import { Box } from "../../core/Box";
import Tab from "../../shared/Tab";
import { DETAIL_PAGE_TABS } from "../../../constants/tabs";
import { DetailTabKeyType } from "../../../types/Tabs";
import { Typography } from "../../core/Typography";
import { TRADE_TRANSLATION } from "../../../constants/translation";
import { isEmpty, toCurrency } from "../../../utils";
import { Loading } from "../../core/Loading";

export default function DetailsPage() {
    const { marketId } = useParams();
    const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'transactions' >('buy')
    const [pageData, setPageData] = useState([]);
    const { request : tradeRequest , isPending } = useAPI({
        apiMethod: () => getBuyOrSellData({ type: activeTab, marketId: marketId }),
        fireOnLoad : true,
        successCallback: (res) => {
            setPageData(res)            
        },
        // dependenciesOnLoad: [activeTab]
    })
    const activeNewTab = (newActiveTabKey : DetailTabKeyType) => {
        setActiveTab(newActiveTabKey)
    }

    // useEffect(() => {
    //     tradeRequest({ type: activeTab, marketId: marketId })
    // },[activeTab])


    if (isPending || isEmpty(pageData)) {
        return <Loading  />
    }
    return (
        <Box>
            <Tab activeTab={activeTab} setActiveTab={activeNewTab} tabs={DETAIL_PAGE_TABS} />
            <Box className="grid text-center grid-cols-3 text-lg p-3 bg-gray-600 rounded my-4 text-white border-t border-white dark:border-gray-700">
            <Typography> {activeTab === 'transactions' ? TRADE_TRANSLATION.matchAmount : TRADE_TRANSLATION.remain}</Typography>
            <Typography>{TRADE_TRANSLATION.price}</Typography>
            <Typography>{activeTab === 'transactions' ? TRADE_TRANSLATION.time : TRADE_TRANSLATION.value}</Typography>
        </Box>
     <Box className="flex flex-col gap-3">
        {pageData?.map((item : any) => (
        <Box
          key={item.id}
          className="grid text-center grid-cols-3 text-sm p-3 rounded-md shadow text-black border-t border-white"
        >
            <Typography> {activeTab === 'transactions' ? item.matchAmount : item.remain}</Typography>
            <Typography>{toCurrency(item.price)}</Typography>
            <Typography> {activeTab === 'transactions' ? item.time : item.remain}</Typography>
            </Box>
        ))}
     </Box>
        </Box>
    );
};
