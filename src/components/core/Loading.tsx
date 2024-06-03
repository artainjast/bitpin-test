import { Box } from './Box';
import { Typography } from './Typography';

export function Loading()  {
    return (
        <Box className='min-h-screen mx-auto text-center bg-neutral-300 animate-pulse'>
            <Typography>در حال بارگزاری...</Typography>
        </Box>
    );
};
