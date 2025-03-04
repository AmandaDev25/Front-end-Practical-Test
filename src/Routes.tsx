import Dashboard from './pages/dashboard/Index';
import React from 'react';
import MainLayout from './layout/MainLayout';


const routes = () => {
  return [
    {
      element:
          <MainLayout />,
      children: [
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
      ],
    },
  ];
};

export default routes;
