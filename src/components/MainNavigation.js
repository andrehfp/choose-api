import { Menu } from "antd";
import { Link } from "react-router-dom";

import { MailOutlined, StarFilled } from "@ant-design/icons";

function MainNavigation() {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="realEstate" icon={<MailOutlined />}>
        <Link to="/">Api1</Link>
      </Menu.Item>
      <Menu.Item key="starships" icon={<MailOutlined />}>
        <Link to="/api2">Api2</Link>
      </Menu.Item>
      <Menu.Item key="app" icon={<StarFilled />}>
        <Link to="/favorites">My Favorites</Link>
      </Menu.Item>
    </Menu>
  );
}

export default MainNavigation;
