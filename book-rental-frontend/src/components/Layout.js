import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import OwnerDashboard from '../pages/OwnerDashboard';
import ManageBooks from '../pages/ManageBooks';
import Settings from '../pages/Settings';

const Layout = () => {
  const [selectedContent, setSelectedContent] = useState('dashboard');

  const renderContent = () => {
    switch (selectedContent) {
      case 'dashboard':
        return <OwnerDashboard />;
      case 'manageBooks':
        return <ManageBooks />;
      case 'settings':
        return <Settings />;
      case 'logout':
        // return <Logout />;
      default:
        return <OwnerDashboard />;
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar onContentChange={setSelectedContent} />
      <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default Layout;
