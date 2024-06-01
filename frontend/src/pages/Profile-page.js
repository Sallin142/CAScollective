import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';
import { selectApiKey, resetApiKey, getApiKey, selectUserId, removeUser} from '../features/userSlice';
import '../assets/sfu_logo.png'
import '../stylesheets/ProfilePage.css'

const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;

export const ProfilePage = () => {
  let dispatch = useDispatch();
  let userId = useSelector(selectUserId);
  let apiKey = useSelector(selectApiKey);
  const [copySuccess, setCopySuccess] = useState('Copy to Clipboard');
  const [showKey, setShowKey] = useState(false); // new state for controlling visibility of the API key

  useEffect(() => {
    dispatch(getApiKey());
  }, [userId]);

  useEffect(() => {
    dispatch(getApiKey());
  }, [dispatch]);

  const regenerateApiKey = () => {
    dispatch(resetApiKey());
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopySuccess('Copied!');
  }

  const toggleShowKey = () => {
    setShowKey(!showKey); // toggle visibility of API key
  }

  function handleLogout() {
    dispatch(removeUser({}));
    window.location.href = `https://cas.sfu.ca/cas/logout?service=${FRONTEND_URL}/`;
  }

  return (
    <div className='profile-page-container'>
      <div className="profile-page-top">
        <h1>Welcome, {userId}!</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="api-key">
        <h2>API Key</h2>
        <h3>{showKey ? apiKey : '*****'}</h3>
      </div>
      <div className="api-key-buttons">
        <button onClick={regenerateApiKey}>Regenerate API Key</button>
        <button onClick={copyToClipboard}>{copySuccess}</button>
        <button onClick={toggleShowKey}>{showKey ? 'Hide' : 'See'} API Key</button> {/* toggle button text based on showKey */}
      </div>
    </div>
  );
}

export default ProfilePage;
