import { getRequest } from "../../services/serviceLayer";
import { GET_HOME_PAGE_DATA_EP } from "./endpoints";
import { transformHomePageData } from "./transformers";

export function getHomePageData() {
    return getRequest({
        url: GET_HOME_PAGE_DATA_EP,
    }).then(transformHomePageData)
}