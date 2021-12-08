import styles from "./Search.module.css";
import { useHistory, useLocation } from "react-router-dom";
import * as qs from "query-string";
import { useEffect } from "react";

const Search = ({ onSubmit, query, setQuery, reset }) => {
  const location = useLocation();
  const history = useHistory();
  const queryString = qs.parse(location.search);
  const parsedQueryString = queryString.q;

  useEffect(() => {
    setQuery(parsedQueryString ? parsedQueryString : "");
    reset();
  }, [parsedQueryString]);

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit();
    history.push("/search?q=" + query);
    reset();
  };

  return (
    <form className={styles.form} onSubmit={submitForm}>
      <input
        type="search"
        value={query}
        // onFocus={() => setQuery("")}
        placeholder="Search For Images"
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
        required
      />
    </form>
  );
};
export default Search;
