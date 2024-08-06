import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Adjust the import path as needed

const Layout = () => (
  <div style={{ display: 'flex' }}>
    <Sidebar />
    <main style={{ flexGrow: 1, padding: '20px' }}>
      <Outlet />
    </main>
  </div>
);

export default Layout;
