import { Card, Button } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { useContext } from "react";
import FavoritesContext from "../store/favorites-context";
import UserContext from "../store/user-context";

function ListItem({ item }) {
  const favoritesCtx = useContext(FavoritesContext);
  const userCtx = useContext(UserContext);
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
      style={{ width: 600, marginTop: 16 }}
      extra={
        <Button disabled={userCtx.loginStatus?false:true} type="primary" shape="circle" onClick={toggleFavoritesHandler}>
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
