import { Menu, Badge, Button } from "antd";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { MailOutlined, StarFilled, UserOutlined } from "@ant-design/icons";
import FavoritesContext from "../store/favorites-context";
import UserContext from "../store/user-context";

function MainNavigation() {
  const favoritesCtx = useContext(FavoritesContext);
  const userCtx = useContext(UserContext);

  let loginContent;
 
  function onLogout(){
    userCtx.logOut();
  }

  if(userCtx.loginStatus){
    loginContent = ( <Button type="text" onClick={onLogout}> Logout </Button>)
  }
  else {
    loginContent = ( <Link to="/loginPage">Login</Link>)
  }

  return (
    <Menu mode="horizontal">
      <Menu.Item key="realEstate" icon={<MailOutlined />}>
        <Link to="/">Api1</Link>
      </Menu.Item>
      <Menu.Item key="starships" icon={<MailOutlined />}>
        <Link to="/api2">Api2</Link>
      </Menu.Item>
      <Menu.Item key="posts" icon={<MailOutlined />}>
        <Link to="/api3">Api3</Link>
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
      >
        {loginContent}
      </Menu.Item>
    </Menu>
  );
}

export default MainNavigation;
