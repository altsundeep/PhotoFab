import styles from "./SearchData.module.css";
import { FaDownload } from "react-icons/fa";
import { ImHeart } from "react-icons/im";
import { forwardRef, useState } from "react";
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";

const SearchData = ({ search }, ref) => {
  const [color] = useState("#6d32db");
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #6d32db;
  `;

  return (
    <div>
      <div className={styles.container}>
        {search !== undefined
          ? search.map((item, key) => {
              return (
                <div key={key} className={styles.imgcontainer}>
                  <img src={item.urls.regular} alt={item.description} />
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
                        <span>{item.user.username}</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
      <center>
        <PropagateLoader color={color} css={override} size={25} />
      </center>

      <div ref={ref} />
    </div>
  );
};

export default forwardRef(SearchData);
