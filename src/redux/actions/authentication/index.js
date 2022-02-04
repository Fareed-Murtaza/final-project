import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref, set, child, get } from "firebase/database";

import { LOG_OUT, SET_AUTH_ERROR, SIGN_IN, SIGN_UP, START_AUTH_LOADING } from "./types";
import { firebaseDatabase, firebaseAuth } from '../../../firebase';

export const userSignup = (name, email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then(({ user }) => {
        set(ref(firebaseDatabase, 'users/' + user.uid), { name: name });

        dispatch(signupSuccessful({
          uid: user.uid,
          name: name,
          email: user.email
        }));
      })
      .catch(error => dispatch(generateError(error)))
  }
}

export const userSignin = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(({ user }) => {
        get(child(ref(firebaseDatabase), `users/${user.uid}`)).then((snapshot) => {
          let name;
          snapshot.exists() ? name = snapshot.val().name : name = null;

          dispatch(signinSuccessful({
            uid: user.uid,
            name: name,
            email: user.email
          }));
        }).catch((error) => {
          console.error(error);
        });
      })
      .catch(error => dispatch(generateError(error)))
  }
}

export const userLogout = () => {
  return (dispatch) => {
    dispatch(startLoading());
    signOut(firebaseAuth)
      .then(() => dispatch(logoutSuccessful()))
      .catch(error => dispatch(generateError(error)))
  }
}


const startLoading = () => {
  return {
    type: START_AUTH_LOADING
  }
}
const generateError = (error) => {
  return {
    type: SET_AUTH_ERROR,
    error: error
  }
}
const signupSuccessful = (user) => {
  return {
    type: SIGN_UP,
    payload: user
  }
}
const signinSuccessful = (user) => {
  return {
    type: SIGN_IN,
    payload: user
  }
}
const logoutSuccessful = () => {
  return {
    type: LOG_OUT
  }
}