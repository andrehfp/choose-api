import { Empty, Button } from "antd";
import { Link } from "react-router-dom";

function FavoritesPage() {
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 60,
      }}
      description={
        <span>
          No favorites yet?
        </span>
      }
    >
      <Button type="primary"><Link to= '/'>Start now!</Link></Button>
    </Empty>
  );
}

export default FavoritesPage;
