import styles from "./Header.module.css";
import Search from "./Search";
import { Link } from "react-router-dom";

const Header = ({ onSubmit, query, setQuery, reset }) => {
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <div className={styles.title}>
          <Link to="/"> Imaazoo </Link>
        </div>
        <div className={styles.searchbox}>
          <Search
            onSubmit={onSubmit}
            query={query}
            setQuery={setQuery}
            reset={reset}
          />
        </div>
        <div className={styles.menu}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search?q=nature">Nature</Link>
            </li>
            <li>
              <Link to="/search?q=photography">Photography</Link>
            </li>

            <li>
              <Link to="/search?q=landscape">Landscaps</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
