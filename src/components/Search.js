import { Input, Row, Col, Select } from "antd";
import { useState, useEffect } from "react";

const { Option } = Select;
const { Search } = Input;

function SearchComponent({ content, onSearch, onOrderBy }) {
  const [field, setField] = useState();
  const [options, setOptions] = useState([]);
  const [orderBy, setOrderBy] = useState([]);

  function onOrderByHandler(value) {
    onOrderBy(orderBy, value);
  }

  function onSearchHandler(search) {
    onSearch(search, field);
  }

  function selectChangeHandler(value) {
    setField(value);
  }

  function selectOrderByChange(value) {
    setOrderBy(value);
  }

  useEffect(() => {
    content.forEach((item) => {
      Object.keys(item).forEach((e) => {
        if (options.indexOf(e) === -1) {
          setOptions(options.concat(e));
        }
      });
    });
  }, [options, content]);

  return (
    <Row gutter={8}>
      <Col xs={4} md={4}>
        <Select onChange={selectChangeHandler} style={{ width: "100%" }}>
          {options.map((item) => {
            return (
              <Option key={item} value={item}>
                {item}
              </Option>
            );
          })}
        </Select>
      </Col>
      <Col xs={4} sm={4} md={4}>
        {field ? (
          <Search placeholder="Search Here" onSearch={onSearchHandler} />
        ) : (
          <Search placeholder="Choose a field" disabled />
        )}
      </Col>
      <Col xs={4} md={4}>
        <Select onChange={selectOrderByChange} style={{ width: "100%" }}>
          {options.map((item) => {
            return (
              <Option key={item} value={item}>
                {item}
              </Option>
            );
          })}
        </Select>
      </Col>
      <Col xs={4} md={4}>
        <Select onChange={onOrderByHandler} style={{ width: "100%" }}>
              <Option value="asc">
                Asc
              </Option>
              <Option value="desc">
                Desc
              </Option>
        </Select>
      </Col>
    </Row>
  );
}

export default SearchComponent;
