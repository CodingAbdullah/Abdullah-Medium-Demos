import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import BitcoinInformation from '../MDX/BitcoinInformation.mdx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const MDXViewer: React.FC = () => {
    const queryClient = new QueryClient();

    return (
        <MDXProvider>
            <QueryClientProvider client={queryClient}>
                <BitcoinInformation />
            </ QueryClientProvider>
        </MDXProvider>
    );
};

export default MDXViewer; 