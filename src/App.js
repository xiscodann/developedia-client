import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from 'react-router-dom';
import HomePage from './container/homePage';
import LoginPage from './container/loginPage';
import ProfilePage from './container/profilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme.js';
import { ThemeProvider } from '@emotion/react';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));

  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className='App'>
      <Router>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Routes>
            <Route exact path='/' element={<LoginPage theme={theme} />} />
            <Route
              exact
              path='/home'
              element={
                isAuth ? <HomePage theme={theme} /> : <Navigate to='/' />
              }
            />
            <Route
              exact
              path='/profile/:userId'
              element={
                isAuth ? <ProfilePage theme={theme} /> : <Navigate to='/' />
              }
            />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
