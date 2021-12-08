import React, { useEffect, useState, useRef, useCallback } from "react";
import styles from "./PhotoList.module.css";
import { FaDownload } from "react-icons/fa";
import { ImHeart } from "react-icons/im";
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const PhotoList = () => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [, setIsLoading] = useState(true);
  const [hasMoreContent, setHasMoreContent] = useState();
  const [, setError] = useState(false);
  const { REACT_APP_KEY } = process.env;
  const divRef = useRef(null);
  const [color] = useState("#6d32db");

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #6d32db;
  `;

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(false);
      let perPage = 10;
      const res = await fetch(
        `https://api.unsplash.com/photos?client_id=${REACT_APP_KEY}&page=${page}&per_page=${perPage}`
      );
      if (res.status === 200) {
        const resp = await res.json();
        setList((p) => [...new Set([...p, ...resp])]);
        setHasMoreContent(resp.length > 0);
        setIsLoading(false);
      }

      if (res.status === 403) {
        console.log("Limit exausted");
      }
    };
    return getData();
  }, [page]);

  const handleObserver = useCallback((entries, observer) => {
    if (entries[0].isIntersecting) {
      setPage((page) => page + 1);
    }
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (divRef.current) observer.observe(divRef.current);
  }, [handleObserver, hasMoreContent]);

  return (
    <div>
      <div className={styles.container}>
        {list !== undefined
          ? list.map((item, key) => {
              return (
                <div key={key} className={styles.imgcontainer}>
                  <img src={item.urls.thumb} alt={item.description} />
                  <div className={styles.overlay}>
                    <div className={styles.icon_container}>
                      <form action={item.links.download} method="get">
                        <button type="submit">
                          <FaDownload className={styles.faDownload} />
                        </button>
                      </form>

                      <ImHeart className={styles.likes} />
                      <span>{item.likes}</span>
                      <span>
                        <Link
                          to={{
                            pathname: `user/${item.user.username}`,
                            state: item.user,
                          }}
                        >
                          {item.user.name}
                        </Link>{" "}
                        <span></span>
                      </span>
                    </div>
                  </div>
                  {/*  */}
                </div>
              );
            })
          : ""}
      </div>
      <center>
        <PropagateLoader color={color} css={override} size={25} />
      </center>
      <div ref={divRef} />
    </div>
  );
};

export default PhotoList;
