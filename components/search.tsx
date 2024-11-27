"use client";
import React from "react";
import Navbar from "./navbar";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const Search = () => {
  const SearchParams = useSearchParams();
  const search = SearchParams.get("searchValue");

  return (
    <div className="z-10  ">
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar searchValue={search || ""} />
      </Suspense>
    </div>
  );
};

export default Search;
