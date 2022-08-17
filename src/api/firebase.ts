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
  updateDoc,
  deleteDoc,
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
  genres: string[];
  year: number;
  season: string;
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
        season: doc.data().season,
        year: doc.data().year,
        genres: doc.data().genres,
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
      season: anime.season!,
      year: anime.seasonYear!,
      genres: anime.genres!
    };

    await setDoc(doc(userList, `/${anime.id!}`), item);
    return item;
  } catch (e) {
    console.log("Error adding to watch list:", e);
  }
};

export const updateWatchListEntry = async (
  userID: string,
  anime: Anime,
  status: WatchStatus
) => {
  try {
    const userDoc = doc(collection(db, "users"), `/${userID}`);
    const userList = collection(userDoc, "watchlist");
    const watchListDoc = doc(userList, `/${anime.id}`);

    updateDoc(watchListDoc, {
      status,
    });

    return {
      id: anime.id!,
      title: anime.title?.romaji!,
      imageURL: anime.coverImage?.extraLarge!,
      status,
      season: anime.season!,
      year: anime.seasonYear!,
      genres: anime.genres!
    };
  } catch (e) {
    console.log("Error updating watch list entry:", e);
  }
};

export const removeFromWatchList = async (userID: string, animeID: number) => {
  try {
    const userDoc = doc(collection(db, "users"), `/${userID}`);
    const userList = collection(userDoc, "watchlist");
    const watchListDoc = doc(userList, `/${animeID}`);

    await deleteDoc(watchListDoc);
    return animeID;
  } catch (e) {
    console.log("Error removing anime from watchlist", e);
  }
};
