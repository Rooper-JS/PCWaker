import auth from '@react-native-firebase/auth';

export type AuthData = {
    token: string;
    email: string;
    name: string;
  };
  const signIn = (email: string, _password: string): Promise<AuthData> => {
    // this is a mock of an API call, in a real app
    // will be need connect with some real API,
    // send email and password, and if credential is corret
    //the API will resolve with some token and another datas as the below



    auth()
    .createUserWithEmailAndPassword('julian.seiler@freenet.de', 'Logo0001!')
    .then(() => {
        console.log('User account created & signed in!');
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


    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: JWTTokenMock,
          email: email,
          name: 'Lucas Garcez',
        });
      }, 8000);
    });

  };
  
  export const authService = {
    signIn,
  };
  
  const JWTTokenMock =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikx1Y2FzIEdhcmNleiIsImlhdCI6MTUxNjIzOTAyMn0.oK5FZPULfF-nfZmiumDGiufxf10Fe2KiGe9G5Njoa64';
  