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

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setContent(data);
        setTotal(data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);

  function onSearch(search, field) {
    console.log(search, field);
    setResults([]);
    const filteredResults = content.filter((item) => {
      return item[field].toLowerCase().includes(search.toLowerCase());
    });
    setResults(filteredResults);
    setTotal(filteredResults.length);
  }

  if (isLoading) {
    return (
      <Card style={{ width: 600, marginTop: 16 }}>
        <Skeleton active>
          <Meta title="Card title" />
        </Skeleton>
      </Card>
    );
  }

  const indexOfLastPage = page + postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  
  let currentPosts = content.slice(indexOfFirstPage, indexOfLastPage);
  
  if(results && results.length > 0){
    currentPosts = results.slice(indexOfFirstPage, indexOfLastPage);
  }

  return (
    <section>
      <Search content={currentPosts} onSearch={onSearch} />
      {results && results.length > 0
        ? currentPosts.map((item, index) => {
            return <ListItem key={index} item={item} />;
          })
        : currentPosts.map((item, index) => {
            return <ListItem key={index} item={item} />;
          })}
      <Pagination
        onChange={(value) => setPage(value)}
        total={total}
        current={page}
      />
    </section>
  );
}

export default ResultsPage;
