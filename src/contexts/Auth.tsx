import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as Keychain from 'react-native-keychain';
import Toast from 'react-native-toast-message';

import {AuthData, authService} from '../services/authService';

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(email?:string, password?:string): Promise<void>;
  signOut(): void;
};

//Create the Auth Context with the data type specified
//and a empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [authData, setAuthData] = useState<AuthData>();

  //the AuthContext start with loading equals true
  //and stay like this, until the data be load from Async Storage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    loadStorageData();
  }, []);

  const showToast = async () => {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Fehlgeschlagen',
      text2: 'E-Mail und/oder Passwort falsch'
    });
  }

  async function loadStorageData(): Promise<void> {
    try {
      //Try get the data from Async Storage
          // const authDataSerialized = await AsyncStorage.getItem('@AuthData');
          // if (authDataSerialized) {
          //   //If there are data, it's converted to an Object and the state is updated.
          //   const _authData: AuthData = JSON.parse(authDataSerialized);
          //   setAuthData(_authData);
          // }
    } catch (error) {
    } finally {
      //loading finished
      setLoading(false);
    }
  }

  const signIn = async (email?:string, password?:string) => {
    if(email == '' || password == ''){
      await showToast();
      return;
    }
    if(email !=undefined && password !=undefined){
      const _authData = await authService.signIn(email, password);

      //Set the data in the context, so the App can be notified
      //and send the user to the AuthStack
      setAuthData(_authData);
  
      //Persist the data in the Async Storage
      await AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));

      Keychain.setGenericPassword(email, password,{
        service: 'FaceID',
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY as any,
        accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY
      })

      return;
    }
    else {

      // Open Face-Unlock Dialog
      Keychain.getGenericPassword({service: 'FaceID'}).then(
      async (result: boolean | {service: string, username: string, password:string}) => {
          if(!result){
            console.log('failed')
          }
          if(typeof result !== 'boolean'){
            //Erfolgreicher Face-Unlock
            const _authData = await authService.signIn(result.username, result.password);

            //Set the data in the context, so the App can be notified
            //and send the user to the AuthStack
            setAuthData(_authData);
        
            //Persist the data in the Async Storage
            await AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));
          }

        }
      ).catch(async (error) => {
        if((await Keychain.getSupportedBiometryType()) === null){
          return;

        }
        console.log(error);

      })
    }  
  };

  const signOut = async () => {
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    setAuthData(undefined);

    //Remove the data from Async Storage
    //to NOT be recoverede in next session.
    await AsyncStorage.removeItem('@AuthData');
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{authData, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthContext, AuthProvider, useAuth};
