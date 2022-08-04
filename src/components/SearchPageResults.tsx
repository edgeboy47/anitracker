import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { SearchOptions } from "../api/anilist";
import { AnimeSeason } from "../api/anime";
import { useInfiniteSearchAnimeQuery } from "../app/hooks";
import AnimeList from "./AnimeList";
import PlaceholderAnimeList from "./PlaceholderAnimeList";

export const SearchPageResults = () => {
  const [searchParams] = useSearchParams();
  const [searchOptions, setsearchOptions] = useState<SearchOptions>({});

  const {
    data: searchResults,
    isSuccess,
    isFetching,
    fetchNextPage,
  } = useInfiniteSearchAnimeQuery(searchOptions);

  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback<IntersectionObserverCallback>(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && !isFetching && isSuccess && searchResults) {
        console.log("observed");
        fetchNextPage();
      }
    },
    [fetchNextPage, isFetching, isSuccess, searchResults]
  );

  // When the observer div is scrolled into view, run fetchNextPage()
  useEffect(() => {
    console.log("in observer useeffect");
    const elem = observerRef.current!;
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
    });

    observer.observe(elem);
    // return () => observer.unobserve(elem);
    return () => observer.disconnect();
  }, [handleObserver]);

  // Whenever search params change, send a query with the current options
  useEffect(() => {
    console.log("in params useeffect");
    const options: SearchOptions = {};

    for (const [key, value] of searchParams.entries()) {
      // TODO find a way to programmatically set options from search params
      switch (key) {
        case "title":
          options.title = value;
          break;

        case "year":
          options.year = parseInt(value as string);
          break;

        case "season":
          options.season = value as AnimeSeason;
          break;
        
        case "genre":
          options.genre = value;
          break;

        default:
          break;
      }
    }

    setsearchOptions(options);
  }, [searchParams]);

  return (
    // TODO add pagination
    <SearchResults>
      <Results>
        <AnimeList animeList={searchResults} />

        {isFetching && <PlaceholderAnimeList />}
      </Results>
      <div id="observer" ref={observerRef}></div>
    </SearchResults>
  );
};

const SearchResults = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  #observer {
    height: 24px;
  }
`;

const Results = styled.div`
  height: max-content;
  min-height: 90vh;
  max-width: 100vw;
`;
