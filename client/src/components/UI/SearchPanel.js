import React from "react";
import { Input, Spin, Icon } from "antd";

const { Search } = Input;
const spinIcon = <Icon type="loading" style={{ fontSize: "15px", marginRight: '12px' }} spin />;

const SearchPanel = props => {
  const onSearchChange = e => props.onSearch(e.target.value.toLowerCase());
  const spinner = props.loading ? <Spin indicator={spinIcon} /> : null;
      
  return (
    <Search
      placeholder="input search text"
      onChange={e => onSearchChange(e)}
      style={{ marginTop: "15px" }}
      suffix={spinner}
    />
  );
};

export default SearchPanel;
