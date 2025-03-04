import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';



function MainNavbar() {

  return (
    <>
      <AppBar elevation={3}>
        <Toolbar sx={{ height: 64, backgroundColor: 'white' }}>
          <Typography color='black'> <span style={{ fontWeight: 'bold' }}>Be</span>Talent </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default MainNavbar;
