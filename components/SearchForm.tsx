import React from "react";
import Form from "next/form";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import SearchFormReset from "./SearchFormReset";

const SearchForm = ({ search }: { search?: string }) => {
  return (
    <Form
      action="/"
      scroll={false}
      className="max-w-3xl w-full min-h-20 relative"
      id="searchForm"
    >
      <Input
        name="search"
        defaultValue={search}
        className=""
        placeholder="Search Startups"
      />
      <div className="flex gap-2 absolute end-3 top-2.5">
        {search && <SearchFormReset />}

        <button type="submit" className="search-btn">
          <Search className="size-6" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
