import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const loginInWithEmailAndPassword = async (email: string, password: string) => {
  // TODO
  const user = await signInWithEmailAndPassword(auth, email, password);
  return user.user;
};

export const signInWithGoogle = () => {
  // TODO
};

export const logout = async () => {
  // TODO
  await signOut(auth);
};

export const register = async (email: string, password: string) => {
  // TODO error handling

  const user = await createUserWithEmailAndPassword(auth, email, password);
  return user.user;
};
