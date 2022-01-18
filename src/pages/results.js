import { useState, useEffect } from "react";
import { Skeleton, Card, Pagination } from "antd";

import ListItem from "../components/ListItem";
import Search from "../components/Search";

const { Meta } = Card;

function ResultsPage({ url }) {

  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState([]);
  const [results, setResults] = useState([]);

  /* Pagination */
  const [total, setTotal] = useState("");
  const [page, setPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  useEffect(() => {
    setResults([]);
    setIsLoading(true);
    setPage(1);

    fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setIsLoading(false);
          setContent(data);
          setResults(data);
          setTotal(data.length);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [url]);

  function onSearch(search, field) {
    setResults([]);
    const filteredResults = content.filter((item) => {
      return item[field].toLowerCase().includes(search.toLowerCase());
    });
    setResults(filteredResults);
    setTotal(filteredResults.length);
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

  if (isLoading) {
    return (
      <Card style={{ width: 600, marginTop: 16 }}>
        <Skeleton active>
          <Meta title="Card title" />
        </Skeleton>
      </Card>
    );
  }

  return (
    <section>
      <Search content={content} onSearch={onSearch} onOrderBy={onOrderBy} />

      {currentPosts.map((item, index) => {
        return <ListItem key={index} item={item} />;
      })}

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

export default ResultsPage;
