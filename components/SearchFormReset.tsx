"use client";

import Link from "next/link";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.getElementById("searchForm") as HTMLFormElement;

    if (form) form.reset();
  };

  return (
    <button type="reset" className="search-btn relative" onClick={reset}>
      <Link href="/" className="absolute top-2 end-3.5">
        X
      </Link>
    </button>
  );
};

export default SearchFormReset;
