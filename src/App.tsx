import React, {useEffect, useState} from 'react';
import './App.css';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as client from './api/anilist';
import Anime, { AnimeSeason } from './api/anime';

function App() {
  const [anime, setAnime] = useState<Anime[]>([]);
  useEffect(() => {
    // firebase init
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_APP_ID,
      measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    };
    
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    async function search() {
      // TODO: add redux
      const list = await client.getSeasonalAnime(AnimeSeason.Spring, 2022);
      setAnime(list);
    }

    search();

    
  }, []);
  
  return (
    <div className="App">
      AniTracker
      {anime.map(anime =>
        <div key={anime.id}>
          <h1>{anime.title?.english || anime.title?.romaji || ""}</h1>
        </div>)}
    </div>
  );
}

export default App;
