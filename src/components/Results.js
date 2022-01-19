import { useState, useEffect, useCallback } from "react";
import { Pagination, Empty, Divider } from "antd";
import { useLocation } from "react-router-dom";

import ListItem from "../components/ListItem";
import Search from "../components/Search";
import useStorage from "../store/useStorage";

function Results({ data }) {
  const location = useLocation().pathname;
  const [search, setSearch] = useStorage(`${location}search`, "");
  const [searchField, setSearchField] = useStorage(
    `${location}searchField`,
    ""
  );
  const [content, setContent] = useState([]);
  const [results, setResults] = useState([]);
 
  const doSearch = useCallback(
    (search, searchField) => {
      if (search === "" || searchField === "") {
        setResults(content);
        setTotal(content.length);
        return;
      }
      const filteredResults = content.filter((item) => {
        if (item[searchField]) {
          return item[searchField].toLowerCase().includes(search.toLowerCase());
        } else {
          return 0;
        }
      });
      setResults(filteredResults);
      setTotal(filteredResults.length);
    },
    [content]
  );

  useEffect(() => {
    doSearch(search, searchField);
  }, [search, searchField, doSearch]);

  useEffect(() => {
    setContent(data);
    setResults(data);
    setTotal(data.length);
  }, [data]);

  /* Pagination */
  const [total, setTotal] = useState("");
  //const [page, setPage] = useState(1);
  const [page, setPage] = useStorage(`${location}page`, 1);
  const [postPerPage, setPostPerPage] = useState(10);
  /**************/

  function onSearch(search, field) {
    setSearch(search);
    setSearchField(field);
    setResults([]);
    doSearch(search, field);
  }

  function onOrderBy(fieldOrder, filterOrder) {
    sortResult(results, fieldOrder, filterOrder);
    setResults([...results]);
  }

  function sortResult(arr, field, filterOrder) {
    if (filterOrder === "asc") {
      return arr.sort((a, b) => {
        if (a[field] > b[field]) {
          return 1;
        }
        if (b[field] > a[field]) {
          return -1;
        }
        return 0;
      });
    }
    if (filterOrder === "desc") {
      return arr.sort((a, b) => {
        if (a[field] > b[field]) {
          return -1;
        }
        if (b[field] > a[field]) {
          return 1;
        }
        return 0;
      });
    }
  }

  const indexOfLastPage = page * postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  let currentPosts = results.slice(indexOfFirstPage, indexOfLastPage);
  return (
    <section>
      <Search content={content} onSearch={onSearch} onOrderBy={onOrderBy} />

      <Divider />
      <h2>
        {searchField} {search}
      </h2>
      <h3>{results.length} resultados encontrados</h3>

      {currentPosts.length > 0 ? (
        currentPosts.map((item, index) => {
          return <ListItem key={index} item={item} />;
        })
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}

      <Pagination
        onChange={(value) => setPage(value)}
        total={total}
        current={page}
        pageSize={postPerPage}
        onShowSizeChange={(current, size) => {
          setPostPerPage(size);
        }}
      />
    </section>
  );
}

export default Results;
