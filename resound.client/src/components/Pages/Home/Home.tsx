import React, { useEffect, useState, useReducer } from "react";
import ModalCreateProject from "./Modals/ModalCreateProject";
import changeTheme from "../../NavBar/changeTheme";
import { hideNav, viewNav } from "../MainTrack/HiddenNavbar";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SettingOutlined,
  FormOutlined,
  LikeOutlined,
  BarChartOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Button,
  Space,
  Typography,
  List,
  Card,
  Image,
  FloatButton,
  Input,
} from "antd";
import "./Home.css";

const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { Meta } = Card;

const customLabels = ["Проекты", "Любимое", "Статистика"];
const customIcons = [FormOutlined, LikeOutlined, BarChartOutlined];

const items = customLabels.map((label, index) => ({
  key: String(index + 1),
  icon: React.createElement(customIcons[index]),
  label: label,
}));

const projects = [
  {
    title: "Проект1",
    image: "https://via.placeholder.com/50",
    description: "Описание 1",
  },
  {
    title: "Проект2",
    image: "https://via.placeholder.com/50",
    description: "Описание 1",
  },
  {
    title: "Проект3",
    image: "https://via.placeholder.com/50",
    description: "Описание 1",
  },
];

const menu = (
  <Menu>
    <Menu.Item key="1">Редактировать</Menu.Item>
    <Menu.Item key="2">Выход</Menu.Item>
  </Menu>
);

const user = JSON.parse(localStorage.getItem("userfull")!);

const UserPanel = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: 20,
      marginTop: 20,
    }}
  >
    <Avatar size={50} icon={<UserOutlined />} />
    <p>{user.login}</p>
    <p>{user.email}</p>
    <Dropdown overlay={menu}>
      <Button>
        <SettingOutlined />
      </Button>
    </Dropdown>
  </div>
);

const Home = () => {
  return (
    <Layout>
      <Sider
        className="sidebar"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <UserPanel />
        <Menu
          className="sidemenu"
          theme="light"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout className="layoutHome">
        <Content
          style={{
            margin: "24px 16px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="creatediv">
            <Title level={2}>Создать музыку</Title>
            <ModalCreateProject></ModalCreateProject>
          </div>
          <Title level={4}>Мои музыкальные произведения</Title>
          <Search
            style={{ marginTop: 20 }}
            placeholder="Поиск музыкальных произведений"
            enterButton
          />
          <List
            className="listprojects"
            grid={{ gutter: 16, column: 3 }}
            dataSource={projects}
            renderItem={(item) => (
              <List.Item>
                <Card className="card-project" hoverable>
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: 1 }}>
                      <Image
                        alt={item.title}
                        src={item.image}
                        style={{ objectFit: "cover", height: 50 }}
                      />
                    </div>
                    <div style={{ flex: 2, paddingLeft: 16 }}>
                      <Card.Meta
                        title={item.title}
                        description={item.description}
                      />
                    </div>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </Content>
      </Layout>
      <FloatButton
        icon={<QuestionCircleOutlined />}
        type="primary"
        style={{ right: 94 }}
      />
    </Layout>
  );
};

export default Home;
