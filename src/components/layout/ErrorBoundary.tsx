import React, { ReactElement } from 'react';
import { Box } from '../core/Box';

interface Props {
    children: ReactElement;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box className='text-title animate-ping text-gray-600 align-center'>
                    مشکی در اپ رخ داده است لطفا اپ را دوباره باز کنید
                </Box>
            );
        }

        return this.props.children;
    }
}