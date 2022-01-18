import { Card, Typography, Button } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { useContext } from "react";
import FavoritesContext from "../store/favorites-context";
const { Title } = Typography;

function ListItem({ item }) {
  const favoritesCtx = useContext(FavoritesContext);
  const itemIsFavorite = favoritesCtx.itemIsFavorite(item);

  function toggleFavoritesHandler() {
    if (itemIsFavorite) {
      favoritesCtx.removeFavorite(item);
    } else {
      favoritesCtx.addFavorite(item);
    }
  }

  return (
    <Card
      title={<Title level={4}>{item.title}</Title>}
      style={{ width: 600, marginTop: 16 }}
      extra={
        <Button type="primary" shape="circle" onClick={toggleFavoritesHandler}>
          {itemIsFavorite ? <StarFilled /> : <StarOutlined />}
        </Button>
      }
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
