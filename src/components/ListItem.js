import { Card, Typography } from "antd";

const { Title } = Typography;

function ListItem({ item }) {
  return (
    <Card
      title={<Title level={4}>{item.title}</Title>}
      style={{ width: 600, marginTop: 16 }}
    >
      {Object.keys(item).map((e, i) => {
        return (
          <div key={i}>
            <h3>
              <strong>{e}:</strong>
            </h3>
            <p>{item[e]}</p>
          </div>
        );
      })}
    </Card>
  );
}

export default ListItem;
