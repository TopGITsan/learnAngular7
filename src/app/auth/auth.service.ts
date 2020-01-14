import * as firebase from 'firebase';

export class AuthService {
  token: string;

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log('Response: ', response);
        firebase.auth().currentUser.getIdToken()
          .then(token => {
            console.log(token);
            this.token = token;
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log('Error: ', error));
  }

  getToken(){
    firebase.auth().currentUser.getIdToken()
      .then(token => this.token = token)
      .catch(error => console.log(error));
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}