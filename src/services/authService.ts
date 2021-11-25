import auth from '@react-native-firebase/auth';

export type AuthData = {
    token: string;
    email: string;
    name: string;
  };
  const signIn = (email: string, password: string): Promise<AuthData> => {
    // this is a mock of an API call, in a real app
    // will be need connect with some real API,
    // send email and password, and if credential is corret
    //the API will resolve with some token and another datas as the below


    return new Promise((resolve) => {

        auth().signInWithEmailAndPassword('julian.seiler@freenet.de', 'Logo0001!')
        .then((res) => {
            console.log(res);
            auth().currentUser.getIdToken().then((token) => {
                console.log(token);
                resolve({
                    token: token,
                    email: email,
                    name: 'Rooper',
                  });
            })
           
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            }
            if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            }
            console.error(error);
        });
      
    });

  };
  
  export const authService = {
    signIn,
  };
  
  