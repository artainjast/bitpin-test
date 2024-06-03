import { useState } from "react";
import { getHomePageData } from "../../../api";
import usePageData from "../../../hooks/usePageData";
import { Loading } from "../../core/Loading";
import { Box } from "../../core/Box";
import { ROUTES } from "../../../constants/routes";
import { Link } from "react-router-dom";
import { Typography } from "../../core/Typography";
import Tab from "../../shared/Tab";
import { isEmpty, toCurrency } from "../../../utils";
import { TabKeyType } from "../../../types/Tabs";
import { TRANSLATIONS } from "../../../constants/translation";
import { HOME_PAGE_TABS } from "../../../constants/tabs";




export function HomePage() {
    const [activeTab, setActiveTab] = useState<TabKeyType>('IRT')
    const { pageData, pending } = usePageData({
        apiMethod: getHomePageData
    })
    if (pending || isEmpty(pageData)) {
        return <Loading />
    }    

    const activeNewTab = (newActiveTabKey : TabKeyType) => {
        setActiveTab(newActiveTabKey)
    }

    return (
        <Box className="px-5 pt-3">
            <Tab
                activeTab={activeTab}
                setActiveTab={activeNewTab}
                tabs={HOME_PAGE_TABS}
            />
        <Box className="grid text-center grid-cols-6 text-lg  p-3 bg-gray-600 rounded my-4 text-white border-t border-white dark:border-gray-700">
            <Typography>{TRANSLATIONS.code}</Typography>
            <Typography>{TRANSLATIONS.title}</Typography>
            <Typography>{TRANSLATIONS.price}</Typography>
            <Typography>{TRANSLATIONS.maxBuyAmount}</Typography>
            <Typography>{TRANSLATIONS.maxSellAmount}</Typography>
            <Typography>{TRANSLATIONS.more}</Typography>
        </Box>
     <Box className="flex flex-col gap-3">
        {pageData.results[activeTab]?.map((item : any) => (
        <Box
          key={item.id}
          className="grid text-center grid-cols-6 text-sm p-3 rounded-md shadow text-black border-t border-white"
        >
          <Typography>{item.code}</Typography>
          <Typography>{item.title_fa}</Typography>
          <Typography>{toCurrency(item.price)}</Typography>
          <Typography>{toCurrency(item.otc_max_buy_amount)}</Typography>
          <Typography>{toCurrency(item.otc_max_sell_amount)}</Typography>

            <Box className="flex justify-center">
                <Link to={`${ROUTES.MARKET_DETAILS}/${item.id}`}>
                <Box tag="button" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    {TRANSLATIONS.more}
                </Box>
                </Link>
            </Box>
            </Box>
        ))}
     </Box>
      
    </Box>
    );
}
