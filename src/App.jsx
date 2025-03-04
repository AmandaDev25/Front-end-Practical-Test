import { useRoutes } from 'react-router-dom';
import routes from './Routes';
import { CssBaseline } from '@mui/material';
import store from './store';

const App = () => {
  const { currentUser } = store.getState().user;
  const routing = useRoutes(routes(currentUser));
  return (
    <>
      <CssBaseline />
      {routing}
    </>
  );
};

export default App;
