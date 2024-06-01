import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {NavLink} from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useGetUserID }  from '../hooks/useGetUserID';
import logo from '../assets/sfu_logo.png';  // Path to the SFU logo 
import '../stylesheets/Home.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;
 
export const Home = () => {
  const userID = useGetUserID();
    return (

        <div className='home-container'>
            <img src={logo} alt="SFU Logo" className="sfu-logo"/>
            <h1>Welcome to our Application</h1>
            {
                userID ? (
                    <p>Hello, you are already logged in with your CAS credentials.</p>
                ) : (
                    <>
                        <p>Start by logging in with your SFU CAS credentials.</p>
                        <p>After logging in, you can access your profile and collection pages.</p>
                    </>
                )
            }
        </div>
    );
};
