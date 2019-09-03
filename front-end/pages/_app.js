// next.js에서 사용하는 layout 전용 컴포넌트
import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const ZeroBird = ({ Component }) => {
    return (
        <>
            <Head>
                <title>Zero bird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.22.2/antd.min.css"/>
            </Head>
            <AppLayout>
                <Component />                 
            </AppLayout>                    
        </>
    )
}

export default ZeroBird;
