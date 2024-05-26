import React, { useEffect, useState, useRef, useReducer } from "react";
import ModalCreateProject from "./Modals/ModalCreateProject";
import { useNavigate, Link } from "react-router-dom";
import changeTheme from "../../NavBar/changeTheme";
import { hideNav, viewNav } from "../MainTrack/HiddenNavbar";
import AudioPlayer from "react-audio-player";
import type { MenuProps, TourProps } from "antd";
import { Bar } from "@ant-design/charts";
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
  ExportOutlined,
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
  Table,
} from "antd";
import "./Home.css";
import axios from "axios";
import ModalUpdateProject from "./Modals/ModalUpdateProject";
import ModalUpdateUser from "./Modals/ModalUpdateUser";

const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { Meta } = Card;

const customLabels = ["Проекты", "Опубликованные", "Избранные", "Статистика"];
const customIcons = [
  FormOutlined,
  ExportOutlined,
  LikeOutlined,
  BarChartOutlined,
];

const itemsMenu = customLabels.map((label, index) => ({
  key: String(index + 1),
  icon: React.createElement(customIcons[index]),
  label: label,
}));

const user = JSON.parse(localStorage.getItem("userfull")!);

let menu = null;
if (user != null) {
  menu = (
    <Menu>
      <Menu.Item key="1">
        <ModalUpdateUser userlogin={user.login}></ModalUpdateUser>
      </Menu.Item>
    </Menu>
  );
}

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

const Statistic = () => {
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
  const [data, setData] = useState([]);
  const [dataRating, setDataRating] = useState([]);

  const columns = [
    {
      title: "Название трека",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Количество прослушиваний",
      dataIndex: "views",
      key: "views",
    },
  ];

  useEffect(() => {
    getSequencers();
    getDataRating();
  }, []);

  const changeMenu = async (value: string) => {
    if (value === "1") {
      navigate("/home");
    }
    if (value === "2") {
      navigate("/publictracks");
    }
    if (value === "3") {
      navigate("/favorite");
    }
    if (value === "4") {
      navigate("/statistic");
    }
  };

  const getSequencers = async () => {
    const response = await axios.get(
      "https://localhost:7262/Users/user-track?iduser=" +
        localStorage.getItem("userid")
    );

    setData(response.data);
  };

  const getDataRating = async () => {
    const response = await axios.get(
      "https://localhost:7262/Tracks/my-popularite?iduser=" +
        localStorage.getItem("userid")
    );

    setDataRating(response.data);
  };

  const config = {
    data: dataRating,

    xField: "name",
    yField: "rating",
  };

  if (!data || !dataRating) {
    return <></>;
  }

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
            <Title level={2}>Статистика</Title>
          </Card>
          <Typography.Title level={3}>
            Количество прослушиваний у ваших треков
          </Typography.Title>
          <Table
            dataSource={data}
            columns={columns}
            pagination={{ pageSize: 4 }}
          />
          <Typography.Title level={3}>Рейтинг ваших треков</Typography.Title>
          <Typography.Text type="secondary">
            По этому рейтингу определяется на какой строчке будет ваш трек во
            вкладке "В тренде"
          </Typography.Text>

          <div style={{ height: 400 }}>
            <Bar {...config} />
          </div>
        </Content>
        <Tour
          open={openTour}
          onClose={() => setOpenTour(false)}
          steps={steps}
        />
      </Layout>
    </Layout>
  );
};

export default Statistic;
