"use client";
import React from "react";
import Navbar from "./navbar";
import { useSearchParams } from "next/navigation";

const Search = () => {
  const SearchParams = useSearchParams();
  const search = SearchParams.get("searchValue");

  return (
    <div className="z-10  ">
      <Navbar searchValue={search || ""} />;
    </div>
  );
};

export default Search;
