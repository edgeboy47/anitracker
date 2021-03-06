import styled from "styled-components";
import { WatchStatus } from "../api/firebase";

type Props = {
  search: string;
  setSearch: (search: string) => void;
  watchStatusFilter: "All" | WatchStatus;
  setWatchStatusFilter: (watchStatusFilter: "All" | WatchStatus) => void;
};

const WatchListPageControls = ({
  search,
  setSearch,
  watchStatusFilter,
  setWatchStatusFilter,
}: Props) => {
  return (
    <StyledWatchListPageControls>
      <input
        type="text"
        placeholder="Title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div id="selectDiv">
        <span>Group by Status</span>
        <StyledSelect
          name="status"
          id="status"
          onChange={(e) => {
            const val = e.target.value;

            if (val === "All") {
              setWatchStatusFilter("All");
            } else {
              setWatchStatusFilter(val as WatchStatus);
            }
          }}
        >
          <option value="All">All</option>
          {Object.values(WatchStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </StyledSelect>
      </div>
    </StyledWatchListPageControls>
  );
};

const StyledWatchListPageControls = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  font: inherit;
  gap: 1rem;
  padding: 1rem;

  input {
    background: #fff;
    border-radius: 8px;
    padding: 1rem;
    outline: none;
    border: none;
    font-size: 1rem;
  }

  #selectDiv {
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
    width: 100%;
    span {
      font-size: 0.875rem;
    }
  }
`;

const StyledSelect = styled.select`
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  outline: none;
  border: none;
  font-size: 1rem;
`;
export default WatchListPageControls;
