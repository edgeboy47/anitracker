import { auth, db } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  updateProfile,
  GoogleAuthProvider,
  User,
} from "firebase/auth";

import {
  collection,
  addDoc,
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";

interface UserDocument {
  userID: string;
  username: string;
  email: string;
  createdAt: Timestamp;
}

// AUTH functions
export const loginInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const user = await signInWithEmailAndPassword(auth, email, password);
  return user.user.toJSON();
};

export const signInWithGoogle = async () => {
  const google = new GoogleAuthProvider();
  const user = await signInWithPopup(auth, google);
  await createUser(user.user);
  return user.user.toJSON();
  // TODO create user in firestore
};

export const logout = async () => {
  await signOut(auth);
};

export const register = async (
  email: string,
  password: string,
  username: string
) => {
  // TODO error handling

  const user = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user.user, {
    displayName: username,
  });

  // TODO get username from UI
  await createUser(user.user);
  return user.user.toJSON();
};

// FIRESTORE functions
const createUser = async (user: User) => {
  try {
    const userCollection = collection(db, "users").withConverter<UserDocument>({
      toFirestore(user: UserDocument): DocumentData {
        return {
          userID: user.userID,
          username: user.username,
          createdAt: user.createdAt,
          email: user.email,
        };
      },
      fromFirestore(snapshot: QueryDocumentSnapshot): UserDocument {
        return {
          userID: snapshot.id,
          username: snapshot.data().username,
          createdAt: snapshot.data().createdAt,
          email: snapshot.data().email,
        };
      },
    });

    const userdoc: UserDocument = {
      userID: user.uid,
      username: user.displayName ?? "",
      createdAt: Timestamp.now(),
      email: user.email ?? "",
    };

    await addDoc<UserDocument>(userCollection, userdoc);
  } catch (e) {
    console.log("Error creating user:", e);
  }
};
