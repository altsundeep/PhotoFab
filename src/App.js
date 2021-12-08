import { useEffect, useState, useRef, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useCallback } from "react";
import "./App.css";
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { User } from "./User";
const Header = lazy(() => import("./Header"));
const PhotoList = lazy(() => import("./PhotoList"));
const SearchData = lazy(() => import("./SearchData"));

function App() {
  const [search, setSearch] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMoreContent, setHasMoreContent] = useState(true);
  const { REACT_APP_KEY, REACT_APP_API_URL } = process.env;
  const loader = useRef(null);
  const [, setIsLoading] = useState(true);
  const [color] = useState("#6d32db");

  const perPage = 5;
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #6d32db;
  `;

  const getData = useCallback(async () => {
    const res = await fetch(
      `${REACT_APP_API_URL}/search/photos?client_id=${REACT_APP_KEY}&query=${query}&per_page=${perPage}&page=${page}`
    );

    if (res.status === 200) {
      setIsLoading(true);
      const resp = await res.json();
      setSearch((p) => [...p, ...resp.results]);
      setHasMoreContent(resp.results.length > 0);
      setIsLoading(false);
    }
    if (res.status === 403) {
      console.log("Limit exausted");
    }
  }, [page, query]);

  useEffect(() => {
    getData();
  }, [getData]);

  const clearFieldAndArray = () => {
    search.splice(0, search.length);
  };

  // intersection observer[start]
  const handleObserver = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setPage((page) => page + 1);
      }
    });
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (loader.current) observer.observe(loader.current);
  }, [handleObserver, hasMoreContent]);

  // intersection observer[end]
  return (
    <Suspense
      fallback={
        <center>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <PropagateLoader color={color} css={override} size={25} />
          </div>
        </center>
      }
    >
      <Header
        onSubmit={getData}
        query={query}
        setQuery={setQuery}
        reset={clearFieldAndArray}
      />
      <Switch>
        <Route exact path="/">
          <PhotoList />
        </Route>
        <Route path="/search">
          <SearchData ref={loader} getData={getData} search={search} />
        </Route>
      </Switch>
      <Route path="/user/:id" component={User} />

      <div ref={loader} />
    </Suspense>
  );
}

export default App;
