import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { setUserId, removeUser, selectUserId, getApiKey, validateUser, selectIsLoggedIn, selectAdmin } from '../features/userSlice';
import '../stylesheets/NavigationBar.css'


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;
const CAS_URL = process.env.REACT_APP_CAS_URL;

export const NavigationBar = () => {
    const dispatch = useDispatch();
    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    let userId = useSelector(selectUserId);
    let isLoggedIn = useSelector(selectIsLoggedIn);
    let isAdmin = useSelector(selectAdmin);
    console.log(isAdmin)

    

    useEffect(() => {
        if (isLoggedIn) { // get api key once after loggin in just in case it changed on another device
            dispatch(getApiKey({}));
        }
    }, []);

    useEffect(() => {
        const checkAuthentication = async () => {
            if (isLoggedIn) {
                return;
            }

            try {
                const searchParams = new URLSearchParams(location.search);
                const ticket = searchParams.get("ticket");
                
                if (ticket) {
                    await dispatch(validateUser({ticket: ticket}));
                }
                
            } catch (error) {
                console.error("CAS ticket validation failed", error);
            }
        };

        checkAuthentication();
    }, [location.search]);

    const handleLogout = async () => {
        window.location.href = `${CAS_URL}/login?service=${FRONTEND_URL}`;
    };

    return (
        <div className='nav-bar-container'>
            <div className='nav-bar-left'>
                { isAdmin ? (
                    <>
                    {console.log('isAdmin:' + isAdmin)}

                        <h2><Link to='/classes'>Classes</Link></h2>
                    </>
                ) : (
                    <></>
                )}

                <h2><Link to='/'>Home</Link></h2>
                {
                    isLoggedIn ? (
                        <>
                            <h2><Link to='/collections'>Collections</Link></h2>
                        </>
                    ) : (
                        <>
                            <h2><Link>Collections</Link></h2>
                        </>
                    )
                }
            </div>
            
            <div className='nav-bar-right'>
                { isLoggedIn ? (
                    <>
                        <h2><Link to='/profile'>{userId}</Link></h2>
                        
                    </>
                ) : (
                    <>
                        <h2 onClick={handleLogout}>Login</h2>
                    </>
                )}
            </div>
            
        </div>
    );
}
