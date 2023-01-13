import React, { useState } from 'react'
import {Outlet, ScrollRestoration} from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const AppLayout = () => {
    const [isShowDrawer, setIsShowDrawer] = useState(true)

    return (
        <div className="app">
            <ScrollRestoration />

            <Header 
                isShowDrawer={isShowDrawer}
                openDrawer={() => setIsShowDrawer(true)}
                closeDrawer={() => setIsShowDrawer(false)} 
                />
            <main className={`main ${isShowDrawer ? 'main_indent' : ''} `}>
                <Outlet />
            </main>
            <Footer isShowDrawer={isShowDrawer} />
        </div>
    )
}

export default AppLayout