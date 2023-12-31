import React, { useRef } from "react";
import "./style/search.css";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import { useEffect } from "react";

export const Search = ({ query }) => {
  const [searchVal, setSearchVal] = useState("");
  const [cancelTgl, setCancelTgl] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const searchDOM = useRef();
  const emptyString = /^\s+$|^$/gi;

  useLayoutEffect(
    () => {
      query(searchVal);
      //   searchVal !== emptyString.test(searchVal) ? setCancelTgl(true) : setCancelTgl(false);
    },
    [query, searchVal, emptyString]
  );

  return (
    <div className="search_wrap" style={{ border: "1px solid #CFB895", display: "flex", alignItems: 'center', padding: '10px', gap: '8px', background: '#FFFBF6', width: 'fit-content', height: '20px' }}>
      <i className="ph-bold ph-magnifying-glass" style={{ color: '#13120F' }} />
      <input
        ref={searchDOM}
        className="navbar_search"
        type="search"
        placeholder="Search instruments..."
        style={{
          outline: "none", border: "none", background: 'none', color: '#0F1213',
          fontFamily: 'Nunito Sans', fontWeight: '600', width: '280px', fontSize: '15px'
        }}
        value={searchVal}
        onBlur={e => {
          searchVal === "" && setCancelTgl(false);
        }}
        onFocus={e => {
          setCancelTgl(true);
          setSearchVal(e.target.value);
          query(searchVal);
        }}
        onChange={e => {
          setSearchVal(e.target.value);
          query(searchVal);
          searchVal !== emptyString.test(searchVal) ? setCancelTgl(true) : setCancelTgl(false);
        }}
      />
      <i
        className="ph-bold ph-x"
        onClick={e => {
          setSearchVal("");
          query("");
          setTimeout(() => {
            searchDOM.current.focus();
          }, 10);
        }}
        style={{ display: cancelTgl ? "block" : "none", cursor: 'pointer', color: '#13120f' }}
      />
    </div>
  );
};
