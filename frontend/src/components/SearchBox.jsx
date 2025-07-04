import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

// API
import api from "../api/configuration";

// Styles
import "../styles/search-box.css";

// Helpers
import { toPersianDate } from "../helpers/dateHelpers";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const boxRef = useRef(null);
  const abortRef = useRef(null);
  const debounceRef = useRef(null);

  const doSearch = debounce(async (q) => {
    if (abortRef.current) abortRef.current.abort(); 
    abortRef.current = new AbortController();

    try {
      setLoading(true);
      const { data } = await api.get("/diary/search", {
        params: { query: q },
        signal: abortRef.current.signal,
        skipLoading: true,  
      });
      setResults(data);
    } catch (e) { 
      console.log(e);
    }
    setLoading(false);
  }, 800);

  debounceRef.current = doSearch; 

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    doSearch(query);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    const handler = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleEnter = (e) => {
    if (e.key === "Enter") doSearch.flush();
  };

  return (
    <div className="searchBox" ref={boxRef}>
      <input
        id="searchInput"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleEnter}
        placeholder="جستجو در عنوان یا تگ..."
        autoComplete="off"
      />

      {loading && <div className="spinner" />}

      {query && !loading && (
        <div className="resultBox">
          {results.length === 0
            ? <p className="noResult">موردی یافت نشد</p>
            : results.map(r => (
              <Link key={r._id} to={`/${r.date}`} className="item">
                <strong className="title">{r.title || 'بدون عنوان'}</strong>
                <span className="date">{toPersianDate(r.date)}</span>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
