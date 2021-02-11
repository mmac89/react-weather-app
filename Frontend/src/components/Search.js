import React, { useState } from "react";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";

function Search() {
  const [{}, dispatch] = useStateValue();
  const [input, setInput] = useState("");

  const search = (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.SET_SEARCH_LOCATION,
      term: input,
    });
  };

  return (
    <div className="search">
      <form>
        <div className="search__input">
          <input value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <button onClick={search} type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
