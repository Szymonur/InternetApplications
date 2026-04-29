import {
    useState,
    useEffect,
    useRef,
    useCallback,
    useLayoutEffect,
} from "react";
import styles from "./SearchBar.module.css";

function SearchBar({ search, onSearch }) {
    const handeSeachChange = (e) => {
        onSearch(e.target.value);
    };

    return (
        <input
            placeholder="Search by name or description"
            type="text"
            value={search}
            onChange={handeSeachChange}
            className={styles.searchBar}
        />
    );
}

export default SearchBar;
