import { useState, useEffect } from "react";
import { Skeleton, Card } from "antd";

import Results from "../components/Results";

const { Meta } = Card;

function ResultsPage({ url }) {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setContent(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);

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
      <h3>{url}</h3>
      <Results data={content} url={url} />
    </section>
  );
}

export default ResultsPage;
