import React, { useState } from "react";
import { Input, Spin, Icon } from "antd";

const { Search } = Input;
const spinIcon = (
  <Icon type="loading" style={{ fontSize: "15px", marginRight: "12px" }} spin />
);

const SearchPanel = (props) => {
  const [isPending, setPending] = useState(false);
  const { onSearch } = props;

  const onSearchChange = async (e) => {
    setPending(true);
    await onSearch(e.target.value.toLowerCase()).finally(() =>
      setPending(false)
    );
  };
  const spinner = isPending ? <Spin indicator={spinIcon} /> : null;

  return (
    <Search
      placeholder="input search text"
      onChange={(e) => onSearchChange(e)}
      style={{ marginTop: "15px" }}
      suffix={spinner}
    />
  );
};

export default SearchPanel;
