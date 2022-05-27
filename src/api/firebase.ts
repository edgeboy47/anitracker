import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const loginInWithEmailAndPassword = async (email: string, password: string) => {
  const user = await signInWithEmailAndPassword(auth, email, password);
  return user.user.toJSON();
};

export const signInWithGoogle = async () => {
  // TODO
  const google = new GoogleAuthProvider();
  const user = await signInWithPopup(auth, google);
  return user.user.toJSON();
};

export const logout = async () => {
  await signOut(auth);
};

export const register = async (email: string, password: string) => {
  // TODO error handling

  const user = await createUserWithEmailAndPassword(auth, email, password);
  return user.user.toJSON();
};
