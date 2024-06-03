import { Box } from '../core/Box';
import { HOME_PAGE_TABS, DETAIL_PAGE_TABS } from '../../constants/tabs';
import clsx from 'clsx';
import { DetailTabKeyType, TabKeyType } from '../../types/Tabs';


interface Props {
    tabs: typeof HOME_PAGE_TABS | typeof DETAIL_PAGE_TABS,
    setActiveTab: any;
    activeTab: TabKeyType | DetailTabKeyType;
}

const Tab = ({tabs , setActiveTab , activeTab} : Props) => {
    return (
            <Box tag='ul' className='w-full flex justify-between gap-4'>
                {tabs.map((tab) => {
                    return <Box tag='li'
                        className={clsx(
                        "w-full grow  rounded p-4 text-xl text-neutral-700 border-2 shadow-md text-center cursor-pointer",
                        {
                            "border-green-600": activeTab === tab.key,
                            "border-neutral-300": activeTab !== tab.key,
                        }
                        )}
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.title}
                    </Box>
                })}
            </Box>
    );
};

export default Tab;