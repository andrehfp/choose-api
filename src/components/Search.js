import { Input, Row, Col, Select } from "antd";
import { useState, useEffect } from "react";

const { Option } = Select;
const { Search } = Input;

function SearchComponent({ content, onSearch }) {
  const [field, setField] = useState();
  const [options, setOptions] = useState([]);

  function onSearchHandler(search) {
    onSearch(search, field);
  }

  function selectChangeHandler(value) {
    setField(value);
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
      <Col span={2}>
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
      <Col span={2}>
        {field ? (
          <Search placeholder="Search Here" onSearch={onSearchHandler} />
        ) : (
          <Search placeholder="Choose a field" disabled />
        )}
      </Col>
    </Row>
  );
}

export default SearchComponent;
