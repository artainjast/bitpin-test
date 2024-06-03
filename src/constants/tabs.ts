import { DetailPageTabType, TabType } from "../types/Tabs";
import { DETAIL_TAB_NAMES } from "./detailTabNames";
import { MARKET_CODES } from "./marketCodes";

export const HOME_PAGE_TABS : TabType  = [
  {
    title: "بازارهای تومانی",
    key: MARKET_CODES.IRT,
  },
  {
    title: "بازارهای تتری",
    key: MARKET_CODES.USDT,
  },
];

export const DETAIL_PAGE_TABS : DetailPageTabType = [
  {
    title: "خرید",
    key: DETAIL_TAB_NAMES.buy,
  },
  {
    title: "فروش ",
    key: DETAIL_TAB_NAMES.sell,
  },
  {
    title: "معاملات ",
    key: DETAIL_TAB_NAMES.transactions,
  },
];