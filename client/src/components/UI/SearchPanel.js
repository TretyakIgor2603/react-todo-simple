import React from "react";
import { Input } from "antd";

const { Search } = Input;

const SearchPanel = props => {
  const onSearchChange = e => props.onSearch(e.target.value.toLowerCase());

  return (
    <Search
      placeholder="input search text"
      onChange={e => onSearchChange(e)}
      style={{ marginTop: "15px" }}
    />
  );
};

export default SearchPanel;
