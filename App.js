import React from 'react';
import {Router} from './src/routes/Router';
import {AuthProvider} from './src/contexts/Auth';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <>
    <AuthProvider>
      <Router />
    </AuthProvider>
    <Toast />
    </>
  );
};

export default App;
