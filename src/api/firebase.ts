import app, { auth } from "./firebase-config";
import {
  createUserWithEmailAndPassword
} from 'firebase/auth';

export const signInWithEmailAndPassword = (email: string, password: string) => {
  // TODO
};

export const signInWithGoogle = () => {
  // TODO
};

export const signOut = () => {
  // TODO
};

export const register = async (
  email: string,
  password: string
) => {
  // TODO
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
  }
  catch (e) {
    // TODO error handling
    console.log('Error creating user:', e);
  }
};
