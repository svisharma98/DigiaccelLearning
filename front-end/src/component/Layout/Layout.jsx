"use client"; // This line is crucial
import { useState } from 'react';

import Loader from '@/component/Loader/Loader';
import Footer from './Footer';
import Header from "./Header";

const Layout = ({ children }) => {
    const [isLoading, setisLoading] = useState(false);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Header />
                    <div className='container-margin' >
                        {children}
                    </div>
                    <Footer />
                </>
            )}
        </>
    );
};

export default Layout;
