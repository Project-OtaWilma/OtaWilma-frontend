import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useAuth } from '../../features/authentication/authSlice';

import Frontpage from '../Frontpage/Frontpage';
import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';
import ThemeProvider from '../ThemeProvider/ThemeProvider';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

function App() {
    const auth = useSelector(useAuth);

    if (!auth.token) return <Login />

    return (
        <BrowserRouter>
            <ThemeProvider>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Frontpage />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
