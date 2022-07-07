import React, { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <StyledSearch>
        <StyledInput
          type="text"
          placeholder="Search Anime"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && search.trim().length > 0) {
              navigate(`/search?title=${search}`);
            }
          }}
        />
        <MdOutlineSearch
          onClick={(e) => {
            if (search.trim().length > 0) {
              navigate(`/search?title=${search}`);
            }
          }}
        />
      </StyledSearch>
    </div>
  );
};

export default Searchbar;

const StyledSearch = styled.div`
  padding: 1rem;
  background: #eff1f7;
  border-radius: 8px;
  width: min(80%, 1500px);
  margin: 2rem auto;
  display: flex;
  align-items: center;

  svg {
    transform: scale(2.5);
    margin-right: 2rem;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    svg {
      display: none;
    }
  }
`;

const StyledInput = styled.input`
  outline: none;
  max-width: 100%;
  border: none;
  padding: 0.5rem;
  font-size: clamp(0.5rem, 0.5rem + 1vw, 1rem);
  font-weight: 400;
  background: inherit;
  flex: 1;
`;
