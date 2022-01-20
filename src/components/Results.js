import { useState, useEffect, useCallback, useContext } from "react";
import { Pagination, Empty, Divider } from "antd";
import { useLocation } from "react-router-dom";

import ListItem from "../components/ListItem";
import Search from "../components/Search";
import useStorage from "../utils/useStorage";
import UserContext from "../store/user-context";

function Results({ data }) {
  const location = useLocation().pathname;
  const userCtx = useContext(UserContext);
  const [search, setSearch] = useStorage(`${location}${userCtx.userHash}search`, "");
  const [searchField, setSearchField] = useStorage(
    `${location}${userCtx.userHash}searchField`,
    ""
  );
  const [content, setContent] = useState([]);
  const [results, setResults] = useState([]);
 
  const doSearch = useCallback(
    (search, searchField) => {
      if (search === "" || search === undefined) {
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
  const [page, setPage] = useStorage(`${location}${userCtx.userHash}page`, 1);
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
      <Divider />

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
