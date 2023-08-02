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
    <div className="search_wrap" style={{ border: "1px solid black", display: "flex" }}>
      <i class="ph-bold ph-magnifying-glass" />
      <input
        ref={searchDOM}
        className="navbar_search"
        type="search"
        placeholder="Search instruments..."
        style={{ outline: "none", border: "none" }}
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
        class="ph-bold ph-x"
        onClick={e => {
          setSearchVal("");
          query("");
          setTimeout(() => {
            searchDOM.current.focus();
          }, 10);
        }}
        style={{ display: cancelTgl ? "block" : "none" }}
      />
    </div>
  );
};
