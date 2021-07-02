import React from 'react';
import { Router } from 'react-router-dom';

import Routes from './pages/routes/routes';
import history from './pages/routes/history';

import { AuthProvider } from './contexts/AuthContext';

function App() {

  return (

    <AuthProvider>
    <Router history={history}>
      <Routes />
    </Router>
  </AuthProvider>
  
      
  );
}

export default App;