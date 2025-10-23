import React from "react";
import { Layout as AntLayout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Header, Content } = AntLayout;

function Layout({ children }) {
  const location = useLocation();
  const items = [
    { key: "/", label: <Link to="/">Todos</Link> },
    { key: "/categories", label: <Link to="/categories">Categories</Link> },
  ];

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={items}
        />
      </Header>
      <Content style={{ padding: "24px 48px" }}>{children}</Content>
    </AntLayout>
  );
}

export default Layout;
