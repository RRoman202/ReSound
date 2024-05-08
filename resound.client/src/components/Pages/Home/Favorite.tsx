import React, { useEffect, useState, useReducer, useRef } from "react";
import ModalCreateProject from "./Modals/ModalCreateProject";
import { useNavigate, Link } from "react-router-dom";
import changeTheme from "../../NavBar/changeTheme";
import { hideNav, viewNav } from "../MainTrack/HiddenNavbar";
import AudioPlayer from "react-audio-player";
import type { MenuProps, TourProps } from "antd";
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
  MoreOutlined,
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
  Tour,
} from "antd";
import "./Home.css";
import axios from "axios";
import ModalUpdateProject from "./Modals/ModalUpdateProject";
import ModalUpdateUser from "./Modals/ModalUpdateUser";

const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { Meta } = Card;

const customLabels = ["Проекты", "Любимое", "Статистика"];
const customIcons = [FormOutlined, LikeOutlined, BarChartOutlined];

const itemsMenu = customLabels.map((label, index) => ({
  key: String(index + 1),
  icon: React.createElement(customIcons[index]),
  label: label,
}));

const user = JSON.parse(localStorage.getItem("userfull")!);

const menu = (
  <Menu>
    <Menu.Item key="1">
      <ModalUpdateUser userlogin={user.login}></ModalUpdateUser>
    </Menu.Item>
    <Menu.Item key="2">Выход</Menu.Item>
  </Menu>
);

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
    <Avatar
      src={`https://localhost:7262/Files/avatar?iduser=` + user.idUser}
      size={50}
      icon={<UserOutlined />}
    />
    <p>{user.login}</p>
    <p>{user.email}</p>
    <Dropdown overlay={menu}>
      <Button>
        <SettingOutlined />
      </Button>
    </Dropdown>
  </div>
);

const Favorite = () => {
  viewNav();

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [openTour, setOpenTour] = useState<boolean>(false);
  const steps: TourProps["steps"] = [
    {
      title: "Ваши данные",
      description: "Следите за вашими проектами и их статистикой.",
      target: () => ref1.current,
      nextButtonProps: {
        children: <>Дальше</>,
      },
      prevButtonProps: {
        children: <>Назад</>,
      },
    },
    {
      title: "Новые шедевры",
      description: "Создавайте свои проекты и сочиняйте музыку.",
      target: () => ref2.current,
      nextButtonProps: {
        children: <>Дальше</>,
      },
      prevButtonProps: {
        children: <>Назад</>,
      },
    },
    {
      title: "Продолжайте работу",
      description: "Начните с того места откуда закончили.",
      target: () => ref3.current,
      nextButtonProps: {
        children: <>Закончить</>,
      },
      prevButtonProps: {
        children: <>Назад</>,
      },
    },
  ];

  const navigate = useNavigate();
  const [sequencers, setSequencers] = useState([]);
  const [filteredSequencers, setFilteredSequencers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSequencers = async () => {
      const response = await axios.get(
        "https://localhost:7262/Tracks/Favorite?iduser=" +
          localStorage.getItem("userid")
      );
      setSequencers(response.data);
      setFilteredSequencers(response.data);
    };
    fetchSequencers();
  }, []);

  const changeMenu = async (value: string) => {
    if (value === "1") {
      navigate("/home");
    }
    if (value === "2") {
      navigate("/favorite");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filtered = sequencers.filter((sequencer) =>
      sequencer.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredSequencers(filtered);
  };

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
        <div ref={ref1}>
          <UserPanel />
        </div>

        <Menu
          onSelect={(e) => changeMenu(e.key)}
          className="sidemenu"
          theme="light"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={itemsMenu}
        />
      </Sider>
      <Layout className="layoutHome">
        <Content
          style={{
            padding: "20px",
          }}
        >
          <Card className="creatediv" ref={ref2}>
            <Title level={2}>Любимые музыкальные произведения</Title>
          </Card>

          <Search
            style={{ marginTop: 20 }}
            placeholder="Поиск музыкальных произведений"
            enterButton
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div>
            <List
              className="listprojects"
              grid={{ gutter: 12, column: 3 }}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
              dataSource={filteredSequencers}
              renderItem={(sequencer) => (
                <List.Item ref={ref3}>
                  <Card className="card-project" title={sequencer.name}>
                    <p>{sequencer.description}</p>
                    <AudioPlayer
                      style={{ marginTop: "10px" }}
                      src={
                        `https://localhost:7262/track/` + sequencer.idSequencer
                      }
                      autoPlay={false}
                      controls
                    />
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </Content>
        <Tour
          open={openTour}
          onClose={() => setOpenTour(false)}
          steps={steps}
        />
      </Layout>
      <FloatButton
        onClick={() => setOpenTour(true)}
        icon={<QuestionCircleOutlined />}
        type="primary"
        style={{ right: 94 }}
      />
    </Layout>
  );
};

export default Favorite;
