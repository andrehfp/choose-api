import { Menu, Badge } from "antd";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { MailOutlined, StarFilled, UserOutlined } from "@ant-design/icons";
import FavoritesContext from "../store/favorites-context";
import UserContext from "../store/user-context";

function MainNavigation() {
  const favoritesCtx = useContext(FavoritesContext);
  const userCtx = useContext(UserContext);

  function toggleLoginHandler() {
    if (userCtx.isLoggedIn) {
      userCtx.logOut();
    }
    if (!userCtx.isLoggedIn) {
      userCtx.logIn();
    }
  }

  return (
    <Menu mode="horizontal">
      <Menu.Item key="realEstate" icon={<MailOutlined />}>
        <Link to="/">Api1</Link>
      </Menu.Item>
      <Menu.Item key="starships" icon={<MailOutlined />}>
        <Link to="/api2">Api2</Link>
      </Menu.Item>
      <Menu.Item
        key="favorites"
        icon={<StarFilled />}
        disabled={userCtx.loginStatus ? false : true}
      >
        <Link to="/favorites">
          My Favorites <Badge count={favoritesCtx.totalFavorites} />
        </Link>
      </Menu.Item>
      <Menu.Item
        key="login"
        icon={<UserOutlined />}
        onClick={toggleLoginHandler}
      >
        {userCtx.loginStatus ? "Logout" : "Login"}
      </Menu.Item>
    </Menu>
  );
}

export default MainNavigation;
