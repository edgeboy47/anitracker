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
  doc,
  getDocs,
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot,
  setDoc,
} from "firebase/firestore";

import Anime from "./anime";

interface UserDocument {
  userID: string;
  username: string;
  email: string;
  createdAt: Timestamp;
}

export enum WatchStatus {
  Watching = "Watching",
  Completed = "Completed",
  Planning = "Planning",
  Dropped = "Dropped",
}

export interface WatchListItem {
  id: number;
  title: string;
  imageURL: string;
  status: WatchStatus;
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

    await setDoc<UserDocument>(doc(userCollection, user.uid), userdoc);
  } catch (e) {
    console.log("Error creating user:", e);
  }
};

export const getUserWatchList = async (userID: string) => {
  try {
    // TODO return list of watchlist entries, or empty list
    const userRef = collection(db, "users");
    const userDoc = doc(userRef, `/${userID}`);
    const userWatchlistRef = collection(userDoc, "watchlist");

    const snapshot = await getDocs(userWatchlistRef);
    const items = snapshot.docs.map((doc) => {
      const item: WatchListItem = {
        id: parseInt(doc.id),
        title: doc.data().title,
        imageURL: doc.data().imageURL,
        status: doc.data().status,
      };

      return item;
    });

    return items;
  } catch (e) {
    console.log("Error getting user watch list:", e);
    return [];
  }
};

export const addToWatchList = async (
  userID: string,
  anime: Anime,
  status: WatchStatus
) => {
  try {
    const userDoc = doc(collection(db, "users"), `/${userID}`);

    const userList = collection(userDoc, "watchlist");

    const item: WatchListItem = {
      id: anime.id!,
      title: anime.title?.romaji!,
      imageURL: anime.coverImage?.extraLarge!,
      status,
    };

    await setDoc(doc(userList, `/${anime.id!}`), item);
    return item;
  } catch (e) {
    console.log("Error adding to watch list:", e);
  }
};
