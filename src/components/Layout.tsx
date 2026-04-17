import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const Layout = () => {
  const isAuthenticated = localStorage.getItem('hospital_auth') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-transparent">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="p-8 overflow-auto relative z-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
